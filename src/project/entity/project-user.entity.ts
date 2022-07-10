import { UserEntity } from 'src/auth/entity/user.entity';
import { ProjectTaskCommentEntity } from 'src/task/entity/project-task-comment.entity';
import { ProjectTaskEntity } from 'src/task/entity/project-task.entity';
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ProjectRoleEntity } from './project-role.entity';
import { ProjectEntity } from './project.entity';

@Entity()
export class ProjectUserEntity {
  @ManyToOne(() => ProjectEntity, (project) => project.userLinks)
  public project!: ProjectEntity;

  @ManyToOne(() => UserEntity, (user) => user.projectLinks)
  public user!: UserEntity;

  @ManyToMany(() => ProjectRoleEntity)
  @JoinTable()
  public roles: ProjectRoleEntity[];

  @OneToMany(() => ProjectTaskCommentEntity, (comment) => comment.user)
  public comments: ProjectTaskCommentEntity[];

  @OneToMany(() => ProjectTaskEntity, (task) => task.executor)
  executedTasks: ProjectTaskEntity[];

  @OneToMany(() => ProjectTaskEntity, (task) => task.creator)
  tasks: ProjectTaskEntity[];
}
