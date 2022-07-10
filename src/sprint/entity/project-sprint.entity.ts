import { ProjectEntity } from 'src/project/entity/project.entity';
import { ProjectTaskEntity } from 'src/task/entity/project-task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProjectSprintEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public goal: string;

  @Column()
  public isActive: boolean;

  @CreateDateColumn()
  public createDate: Date;

  @ManyToOne(() => ProjectEntity, (project) => project.sprints)
  public project: ProjectEntity;

  @OneToMany(() => ProjectTaskEntity, (task) => task.sprint)
  public tasks: ProjectTaskEntity[];
}
