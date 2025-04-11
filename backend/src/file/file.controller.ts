import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Request,
  UseGuards,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileService } from './file.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload/:folderId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExt = file.originalname.split('.').pop();
          const filename = `${uuidv4()}.${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('folderId') folderId: number,
    @Request() req,
  ) {
    return this.fileService.saveFile(file, req.user, folderId);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getFilesByFolder(@Request() req, @Param('id') id?: number) {
    return this.fileService.getFilesByFolderId(req.user, id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFiles(@Request() req) {
    return this.fileService.getFilesByFolderId(req.user);
  }

  @Post('clone/:fileId')
  @UseGuards(JwtAuthGuard)
  async cloneFile(@Param('fileId') fileId: number, @Request() req) {
    return this.fileService.cloneFile(fileId, req.user);
  }

  @Delete(':fileId')
  @UseGuards(JwtAuthGuard)
  async deleteFile(@Param('fileId') fileId: number, @Request() req) {
    return this.fileService.deleteFile(fileId, req.user);
  }

  @Patch('rename/:fileId')
  @UseGuards(JwtAuthGuard)
  async renameFile(
    @Param('fileId') fileId: number,
    @Body('newName') newName: string,
    @Request() req,
  ) {
    return this.fileService.renameFile(fileId, newName, req.user);
  }

  @Post('edit/:fileId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExt = file.originalname.split('.').pop();
          const filename = `${uuidv4()}.${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard)
  async editFile(
    @Param('fileId') fileId: number,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    return this.fileService.editFile(fileId, file, req.user);
  }
}
