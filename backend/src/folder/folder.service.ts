import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Folder } from './entity/folder.entity';
import { sanitizeString } from '../utils/sanitize';
import { File } from '../file/entity/file.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder) private folderRepository: Repository<Folder>,
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}
  async buildUrlPath(
    folder: Folder,
  ): Promise<{ urlPath: string; path: string }> {
    const ids = [folder.id];
    const names = [folder.name];
    let currentParentId = folder.parentId;

    while (currentParentId) {
      const parent = await this.folderRepository.findOne({
        where: { id: currentParentId },
        select: ['id', 'name', 'parentId'],
      });

      if (!parent) break;

      console.log({ parent });

      ids.unshift(parent.id);
      names.unshift(parent.name);

      currentParentId = parent.parentId;
    }

    return {
      urlPath: '/' + ids.join('/'),
      path: '/' + names.join('/'),
    };
  }

  async createFolder(name: string, userId: number, parentId?: number) {
    const folder = this.folderRepository.create({
      name,
      userId,
      parentId,
      path: ``,
      urlPath: '',
    });

    await this.folderRepository.save(folder);
    const { urlPath, path } = await this.buildUrlPath(folder);
    folder.urlPath = urlPath;
    folder.path = path;

    return this.folderRepository.save(folder);
  }

  async renameFolder(folderId: number, newName: string, user: User) {
    const folder = await this.findFolderById(folderId, user);
    folder.name = newName;
    return this.folderRepository.save(folder);
  }

  async getUserFolders(user: User, parentId: number | null) {
    const current = await this.folderRepository.findOne({
      where: { id: parentId },
    });

    const children = await this.folderRepository.find({
      where: { userId: user.id, parentId },
      relations: ['children'],
    });

    return { children, ...(parentId && { current }) };
  }

  async findFolderById(folderId: number, user: User) {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId, userId: user.id },
    });

    if (!folder) {
      throw new NotFoundException(
        'Folder not found or you do not have access to it',
      );
    }

    return folder;
  }

  private async getDescendantFolderIds(
    parentId: number,
    user: User,
  ): Promise<number[]> {
    const children = await this.folderRepository.find({
      where: { parent: { id: parentId }, user },
      select: ['id'],
    });

    const childIds = children.map((child) => child.id);
    let allDescendants: number[] = [];

    for (const childId of childIds) {
      const deeper = await this.getDescendantFolderIds(childId, user);
      allDescendants.push(childId, ...deeper);
    }

    return allDescendants;
  }

  async deleteFolder(folderId: number, user: User) {
    const folderIds = await this.getDescendantFolderIds(folderId, user);
    folderIds.push(folderId);

    await this.fileRepository
      .createQueryBuilder()
      .delete()
      .where('folderId IN (:...folderIds)', { folderIds })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    await this.folderRepository
      .createQueryBuilder()
      .delete()
      .where('id IN (:...folderIds)', { folderIds })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();
    return { message: 'Folder deleted successfully' };
  }

  async editFolder(
    folderId: number,
    data: { name?: string; parentId?: number },
    user: User,
  ) {
    const folder = await this.findFolderById(folderId, user);

    if (data.name !== undefined) {
      folder.name = data.name;
    }

    if (data.parentId !== undefined) {
      folder.parentId = data.parentId;
    }

    return this.folderRepository.save(folder);
  }

  async cloneFolder(folderId: number, user: User) {
    const original = await this.findFolderById(folderId, user);
    const cloned = this.folderRepository.create({
      name: `${original.name} (copy)`,
      userId: user.id,
      parentId: original.parentId,
    });
    return this.folderRepository.save(cloned);
  }
}
