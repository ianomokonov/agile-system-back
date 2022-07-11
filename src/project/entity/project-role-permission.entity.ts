import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permissions } from '../permissions';
import { ProjectRoleEntity } from './project-role.entity';

@Entity()
export class ProjectRolePermissionEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => ProjectRoleEntity, (role) => role.permissions)
  projectRole: ProjectRoleEntity;

  @Column({
    type: 'enum',
    enum: Permissions,
  })
  public permissionId: Permissions;
}
