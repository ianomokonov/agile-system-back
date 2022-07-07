import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LogInDto } from './dto/log-in.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signIn(@Body() dto: SignInDto) {
    return this.userService.signIn(dto);
  }

  // @HttpCode(200)
  // @Post('login')
  // async logIn(@Body() dto: LogInDto) {
  //   return this.userService.logIn(dto);
  // }
}
