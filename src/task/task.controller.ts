import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TaskPermissionGuard } from 'src/auth/guards/task-permission.guard';
import { AccessPermission } from 'src/decorators/access-permission';
import { Permissions } from 'src/project/permissions';

@Controller('task')
@UseGuards(JwtAuthGuard)
@UseGuards(TaskPermissionGuard)
export class TaskController {
  @Get(':taskId/history')
  @AccessPermission(Permissions.CanReadProject)
  async getHistory(@Param('taskId') taskId: number) {
    throw new NotImplementedException();
  }

  @Get(':taskId/comments')
  @AccessPermission(Permissions.CanReadProject)
  async getComments(@Param('taskId') taskId: number) {
    throw new NotImplementedException();
  }

  @Get(':taskId/criteria')
  @AccessPermission(Permissions.CanReadProject)
  async getCriteria(@Param('taskId') taskId: number) {
    throw new NotImplementedException();
  }

  @Get(':taskId/download-file/:fileId')
  @AccessPermission(Permissions.CanReadProject)
  async getFileUrl(@Param('fileId') fileId: number) {
    throw new NotImplementedException();
  }

  @Get(':taskId')
  @AccessPermission(Permissions.CanReadProject)
  async getTask(@Param('taskId') taskId: number) {
    throw new NotImplementedException();
  }

  @Delete(':taskId/comment/:commentId')
  @AccessPermission(Permissions.CanReadProject)
  async deleteComment(@Param('commentId') commentId: number) {
    throw new NotImplementedException();
  }

  @Delete(':taskId/criteria/:criteriaId')
  @AccessPermission(Permissions.CanEditTask)
  async deleteCriteria(@Param('criteriaId') criteriaId: number) {
    throw new NotImplementedException();
  }

  @Delete(':taskId/remove-file/:fileId')
  @AccessPermission(Permissions.CanEditTask)
  async deleteFile(@Param('fileId') fileId: number) {
    throw new NotImplementedException();
  }

  @Post(':taskId/criteria')
  @AccessPermission(Permissions.CanEditTask)
  async createCriteria(@Body() dto: any) {
    throw new NotImplementedException();
  }

  @Post(':taskId/comment')
  @AccessPermission(Permissions.CanEditTask)
  async createComment(@Body() dto: any) {
    throw new NotImplementedException();
  }

  @Post(':taskId/files')
  @AccessPermission(Permissions.CanEditTask)
  async uploadFiels(@Body() dto: any) {
    throw new NotImplementedException();
  }
}
