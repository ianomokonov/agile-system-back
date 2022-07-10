import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './auth/user.module';
import { getMySQLConfig } from './configs/my-sql.config';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { SprintModule } from './sprint/sprint.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMySQLConfig,
    }),
    UserModule,
    ProjectModule,
    TaskModule,
    SprintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
