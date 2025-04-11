import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Folder } from './entity/folder.entity';
import { User } from '../auth/user.entity';
import { File } from '../file/entity/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, File, User])],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService],
})
export class FolderModule {}
