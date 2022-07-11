import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Permissions } from 'src/project/permissions';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class TaskPermissionGuard implements CanActivate {
  constructor(
    private readonly taskService: TaskService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const {
      user: userId,
      params: { taskId },
    } = context.switchToHttp().getRequest();

    const permission = this.reflector.get<Permissions>(
      'permission',
      context.getHandler(),
    );

    return this.taskService.checkUserPermission(userId, taskId, permission);
  }
}
