import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectRolePermissionEntity } from './project-role-permission.entity';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'projectroles' })
export class ProjectRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ProjectEntity, (project) => project.roles)
  project: ProjectEntity;

  @OneToMany(
    () => ProjectRolePermissionEntity,
    (permission) => permission.projectRole,
  )
  permissions: ProjectRolePermissionEntity[];
}
