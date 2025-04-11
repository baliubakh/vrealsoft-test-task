import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './entity/file.entity';
import { FolderModule } from '../folder/folder.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), FolderModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
