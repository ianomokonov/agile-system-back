import { Column, Entity, ManyToOne } from 'typeorm';
import { Permissions } from '../permissions';
import { ProjectRoleEntity } from './project-role.entity';

@Entity()
export class ProjectRolePermissionEntity {
  @ManyToOne(() => ProjectRoleEntity, (role) => role.permissions)
  projectRole: ProjectRoleEntity;

  @Column({
    type: 'enum',
    enum: Permissions,
  })
  permissionId: Permissions;
}
