import { UserEntity } from 'src/auth/entity/user.entity';
import { ProjectSprintEntity } from 'src/sprint/entity/project-sprint.entity';
import { ProjectTaskEntity } from 'src/task/entity/project-task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectEpicEntity } from './project-epic.entity';
import { ProjectRoleEntity } from './project-role.entity';
import { ProjectUserEntity } from './project-user.entity';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.projects)
  owner: UserEntity;

  @OneToMany(() => ProjectUserEntity, (userLink) => userLink.project)
  public userLinks: ProjectUserEntity[];

  @OneToMany(() => ProjectRoleEntity, (role) => role.project)
  roles: ProjectRoleEntity[];

  @OneToMany(() => ProjectSprintEntity, (sprint) => sprint.project)
  sprints: ProjectSprintEntity[];

  @OneToMany(() => ProjectEpicEntity, (epic) => epic.project)
  epics: ProjectEpicEntity[];

  @OneToMany(() => ProjectTaskEntity, (task) => task.project)
  tasks: ProjectTaskEntity[];

  @UpdateDateColumn()
  lastEditDate: Date;
}
