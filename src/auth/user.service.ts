import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtDto } from './dto/jwt.dto';
import { SignInDto } from './dto/sign-in.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { RefreshTokensEntity } from './entity/refresh-tokens.entity';
import { ConfigService } from '@nestjs/config';
import { LogInDto } from './dto/log-in.dto';

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

  async logIn(dto: LogInDto): Promise<JwtDto> {
    const user = await this.getShortUser(dto.email);
    if (!user) {
      throw new UnauthorizedException(
        'Пользователь с таким email и паролем не найден',
      );
    }

    const isCorrectPassword = compare(dto.password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
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
        { id: user.id },
        { expiresIn: '60s' },
      ),
      refreshToken: refreshToken,
    };
  }

  async getShortUser(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
