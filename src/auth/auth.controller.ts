import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { SignInCredentialsDto } from './dtos/signin-credentials.dto';
import { SignUpCredentialsDto } from './dtos/signup-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  public async signIn(
    @Body() authCredentialsDto: SignInCredentialsDto,
  ): Promise<{ data: { token: string } }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/signup')
  public async signUp(
    @Body() authCredentialsDto: SignUpCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
