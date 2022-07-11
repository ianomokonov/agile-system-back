import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entity/project.entity';
import { Permissions } from './permissions';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: Repository<ProjectEntity>) {}

  public async checkUserPermission(
    userId: number,
    projectId: number,
    permission: Permissions,
  ) {
    if (!userId || !projectId || !permission) {
      return false;
    }

    const ownedProject = await this.projectRepository.findOne({
      where: { id: projectId, owner: { id: userId } },
    });
    if (ownedProject) {
      return true;
    }

    const accessableProject = await this.projectRepository.findOne({
      where: {
        userLinks: {
          user: { id: userId },
          roles: { permissions: { permissionId: permission } },
        },
      },
    });

    return !!accessableProject;
  }
}
