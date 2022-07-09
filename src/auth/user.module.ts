import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getJWTConfig } from 'src/configs/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { RefreshTokensEntity } from './entity/refresh-tokens.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, RefreshTokensEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
