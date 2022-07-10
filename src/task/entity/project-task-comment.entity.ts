import { ProjectUserEntity } from 'src/project/entity/project-user.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectTaskEntity } from './project-task.entity';

export class ProjectTaskCommentEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text' })
  public text: string;

  @CreateDateColumn()
  public createDate: Date;

  @ManyToOne(() => ProjectTaskEntity, (task) => task.comments)
  public task: ProjectTaskEntity;

  @ManyToOne(() => ProjectUserEntity, (user) => user.comments)
  public user: ProjectUserEntity;
}
