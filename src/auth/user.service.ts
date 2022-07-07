import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtDto } from './dto/jwt.dto';
import { SignInDto } from './dto/sign-in.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto): Promise<JwtDto> {
    if (await this.getShortUser(dto.email)) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }
    const salt = await genSalt(10);

    const entity = this.usersRepository.create({
      ...dto,
      password: await hash(dto.password, salt),
    });

    const { id } = await this.usersRepository.save(entity);

    return {
      accessToken: await this.jwtService.signAsync({ id }),
      refreshToken: await this.jwtService.signAsync({ id }),
    };
  }

  async getShortUser(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
