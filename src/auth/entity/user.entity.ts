import { ProjectUserEntity } from 'src/project/entity/project-user.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname?: string;

  @Column()
  vk?: string;

  @Column()
  gitHub?: string;

  @Column()
  image?: string;

  @OneToMany(() => ProjectEntity, (project) => project.owner)
  projects: ProjectEntity[];

  @OneToMany(() => ProjectUserEntity, (projectLink) => projectLink.user)
  public projectLinks!: ProjectUserEntity[];
}
