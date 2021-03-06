import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectTaskStatusEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
}
