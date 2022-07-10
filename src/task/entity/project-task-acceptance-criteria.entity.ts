import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectTaskEntity } from './project-task.entity';

export class ProjectTaskAcceptanceCriteriaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ type: 'text' })
  public description: string;

  @Column()
  public isDone: boolean;

  @CreateDateColumn()
  public createDate: Date;

  @ManyToOne(() => ProjectTaskEntity, (task) => task.criterias)
  public task: ProjectTaskEntity;
}
