import { LogInDto } from './log-in.dto';

export interface SignInDto extends LogInDto {
  name: string;
  surname: string;
  vk: string;
  gitHub: string;
}
