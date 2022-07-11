import {
  Controller,
  Get,
  NotImplementedException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ProjectPermissionGuard } from 'src/auth/guards/project-permission.guard';
import { AccessPermission } from 'src/decorators/access-permission';
import { Permissions } from './permissions';

@Controller('project')
@UseGuards(JwtAuthGuard)
@UseGuards(ProjectPermissionGuard)
export class ProjectController {
  @Get(':projectId/search-tasks')
  @AccessPermission(Permissions.CanReadProject)
  async signIn(@Query('searchString') searchString: string) {
    throw new NotImplementedException();
  }
}
