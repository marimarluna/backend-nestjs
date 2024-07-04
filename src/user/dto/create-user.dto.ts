import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsNumberString()
  @IsOptional()
  @MaxLength(20, { message: 'The  phone exceeds the 20 character limit' })
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: 'The phone must contain a valid  numbers',
  })
  phone: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must contain at least 1 uppercase, 1 lowercase, 1 special character, and at least 8 characters in length',
  })
  @IsNotEmpty({ message: 'The password field is required' })
  password: string;
}
