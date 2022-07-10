import { ProjectEpicEntity } from 'src/project/entity/project-epic.entity';
import { ProjectUserEntity } from 'src/project/entity/project-user.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { ProjectSprintEntity } from 'src/sprint/entity/project-sprint.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskPriority } from '../task-priority';
import { TaskType } from '../task-type';
import { ProjectTaskAcceptanceCriteriaEntity } from './project-task-acceptance-criteria.entity';
import { ProjectTaskCommentEntity } from './project-task-comment.entity';
import { ProjectTaskFileEntity } from './project-task-file.entity';
import { ProjectTaskStatusEntity } from './project-task-status.entity';

@Entity()
export class ProjectTaskEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ type: 'text' })
  public description: string;

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  public type: TaskType;

  @Column({
    type: 'enum',
    enum: TaskPriority,
  })
  public priority: TaskPriority;

  @Column()
  public points: number;

  @UpdateDateColumn()
  public lastEditDate: Date;

  @CreateDateColumn()
  public createDate: Date;

  @ManyToOne(() => ProjectSprintEntity, (sprint) => sprint.tasks)
  public sprint: ProjectSprintEntity;

  @ManyToOne(() => ProjectTaskStatusEntity)
  public status: ProjectTaskStatusEntity;

  @ManyToOne(() => ProjectEpicEntity, (epic) => epic.tasks)
  public epic: ProjectEpicEntity;

  @ManyToOne(() => ProjectTaskEntity)
  public lastEditUser: ProjectUserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  public project: ProjectEntity;

  @ManyToOne(() => ProjectTaskEntity)
  public parent: ProjectTaskEntity;

  @ManyToOne(() => ProjectUserEntity, (user) => user.executedTasks)
  public executor: ProjectUserEntity;

  @ManyToOne(() => ProjectUserEntity, (user) => user.tasks)
  public creator: ProjectUserEntity;

  @OneToMany(() => ProjectTaskFileEntity, (file) => file.task)
  public files: ProjectTaskFileEntity[];

  @OneToMany(() => ProjectTaskCommentEntity, (comment) => comment.user)
  public comments: ProjectTaskCommentEntity[];

  @OneToMany(
    () => ProjectTaskAcceptanceCriteriaEntity,
    (criteria) => criteria.task,
  )
  public criterias: ProjectTaskAcceptanceCriteriaEntity[];
}
