import {
  IsEmail,
  IsString,
  // Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is weak',
  // })
  password: string;
}
