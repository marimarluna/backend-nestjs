import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  readonly email: string;

  @MinLength(6)
  @MaxLength(20)
  readonly password: string;
}
