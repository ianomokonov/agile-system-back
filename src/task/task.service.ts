import { Injectable } from '@nestjs/common';
import { Permissions } from 'src/project/permissions';
import { Repository } from 'typeorm';
import { ProjectTaskEntity } from './entity/project-task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: Repository<ProjectTaskEntity>) {}

  public async checkUserPermission(
    userId: number,
    taskId: number,
    permission: Permissions,
  ) {
    if (!userId || !taskId || !permission) {
      return false;
    }

    const ownedProject = await this.taskRepository.findOne({
      where: { id: taskId, project: { owner: { id: userId } } },
    });
    if (ownedProject) {
      return true;
    }

    const accessableProject = await this.taskRepository.findOne({
      where: {
        id: taskId,
        project: {
          userLinks: {
            user: {
              id: userId,
            },
            roles: {
              permissions: {
                permissionId: permission,
              },
            },
          },
        },
      },
    });

    return !!accessableProject;
  }
}
