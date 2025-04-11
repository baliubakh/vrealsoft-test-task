import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createFolder(
    @Request() req,
    @Body('name') name: string,
    @Body('parentId') parentId?: number,
  ) {
    return this.folderService.createFolder(name, +req.user.id, parentId);
  }

  @Put('rename/:id')
  @UseGuards(JwtAuthGuard)
  async renameFolder(
    @Param('id') id: number,
    @Body('name') name: string,
    @Request() req,
  ) {
    return this.folderService.renameFolder(id, name, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteFolder(@Param('id') id: number, @Request() req) {
    return this.folderService.deleteFolder(id, req.user);
  }

  @Put('edit/:id')
  @UseGuards(JwtAuthGuard)
  async editFolder(
    @Param('id') id: number,
    @Body() body: { name?: string; parentId?: number },
    @Request() req,
  ) {
    return this.folderService.editFolder(id, body, req.user);
  }

  @Post('clone/:id')
  @UseGuards(JwtAuthGuard)
  async cloneFolder(@Param('id') id: number, @Request() req) {
    return this.folderService.cloneFolder(id, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFolders(@Request() req) {
    return this.folderService.getUserFolders(req.user, null);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getChildrenFolders(@Param('id') id: number, @Request() req) {
    return this.folderService.getUserFolders(req.user, id);
  }
}
