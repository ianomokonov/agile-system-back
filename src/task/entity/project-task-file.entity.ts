import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectTaskEntity } from './project-task.entity';

export class ProjectTaskFileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public url: string;

  @ManyToOne(() => ProjectTaskEntity, (task) => task.files)
  public task: ProjectTaskEntity;
}
