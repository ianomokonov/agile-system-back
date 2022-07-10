import { ProjectTaskEntity } from 'src/task/entity/project-task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity()
export class ProjectEpicEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ type: 'text' })
  public description: string;

  @Column()
  public color: string;

  @CreateDateColumn()
  public createDate: Date;

  @UpdateDateColumn()
  public lastEditDate: Date;

  @ManyToOne(() => ProjectEntity, (project) => project.epics)
  public project: ProjectEntity;

  @OneToMany(() => ProjectTaskEntity, (task) => task.epic)
  public tasks: ProjectTaskEntity[];
}
