import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtDto } from './dto/jwt.dto';
import { SignInDto } from './dto/sign-in.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { RefreshTokensEntity } from './entity/refresh-tokens.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokensEntity)
    private refreshTokensRepository: Repository<RefreshTokensEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

    const refreshToken = await this.jwtService.signAsync(
      { id },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    );

    const tokenEntity = this.refreshTokensRepository.create({
      token: refreshToken,
    });
    this.refreshTokensRepository.save(tokenEntity);

    return {
      accessToken: await this.jwtService.signAsync(
        { id },
        { expiresIn: '60s' },
      ),
      refreshToken: refreshToken,
    };
  }

  async getShortUser(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
