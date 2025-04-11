import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entity/file.entity';
import { User } from '../auth/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  private readonly uploadDir = path.resolve(__dirname, '../../uploads');

  async saveFile(file: Express.Multer.File, user: User, folderId: number) {
    const fileEntity = this.fileRepository.create({
      name: file.originalname,
      uniqueName: file.filename,
      userId: user.id,
      filePath: file.path,
      size: file.size,
      folderId,
    });

    await this.fileRepository.save(fileEntity);
    return { message: 'File uploaded successfully', file: fileEntity };
  }

  async getFilesByFolderId(user: User, folderId?: number) {
    return await this.fileRepository.find({
      where: { userId: user.id, ...(folderId && { folderId }) },
    });
  }

  async cloneFile(fileId: number, user: User) {
    const file = await this.fileRepository.findOneBy({
      id: fileId,
      userId: user.id,
    });
    if (!file) throw new NotFoundException('File not found');

    const originalPath = path.join(this.uploadDir, file.uniqueName);
    const newUniqueName = `${uuidv4()}.${file.name.split('.').pop()}`;
    const newFilePath = path.join(this.uploadDir, newUniqueName);

    fs.copyFileSync(originalPath, newFilePath);

    const cloned = this.fileRepository.create({
      name: `Copy of ${file.name}`,
      uniqueName: newUniqueName,
      filePath: newFilePath,
      size: file.size,
      userId: user.id,
      folderId: file.folderId,
    });

    return await this.fileRepository.save(cloned);
  }

  async deleteFile(fileId: number, user: User) {
    const file = await this.fileRepository.findOneBy({
      id: fileId,
      userId: user.id,
    });
    if (!file) throw new NotFoundException('File not found');

    const fullPath = path.join(this.uploadDir, file.uniqueName);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    await this.fileRepository.remove(file);
    return { message: 'File deleted successfully' };
  }

  async renameFile(fileId: number, newName: string, user: User) {
    const file = await this.fileRepository.findOneBy({
      id: fileId,
      userId: user.id,
    });
    if (!file) throw new NotFoundException('File not found');

    file.name = newName;
    await this.fileRepository.save(file);
    return { message: 'File renamed successfully', file };
  }

  async editFile(fileId: number, newFile: Express.Multer.File, user: User) {
    const file = await this.fileRepository.findOneBy({
      id: fileId,
      userId: user.id,
    });
    if (!file) throw new NotFoundException('File not found');

    const oldPath = path.join(this.uploadDir, file.uniqueName);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    file.name = newFile.originalname;
    file.uniqueName = newFile.filename;
    file.filePath = newFile.path;
    file.size = newFile.size;

    await this.fileRepository.save(file);
    return { message: 'File updated successfully', file };
  }
}
