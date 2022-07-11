import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Permissions } from 'src/project/permissions';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class ProjectPermissionGuard implements CanActivate {
  constructor(
    private readonly projectService: ProjectService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const {
      user: userId,
      params: { projectId },
    } = context.switchToHttp().getRequest();

    const permission = this.reflector.get<Permissions>(
      'permission',
      context.getHandler(),
    );

    return this.projectService.checkUserPermission(
      userId,
      projectId,
      permission,
    );
  }
}
