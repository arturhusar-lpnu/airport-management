import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/repositories/users.repository';
import { UserErrors } from './enums/user-errors.enum';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { SignUpCredentialsDto } from './dtos/signup-credentials.dto';
import { SignInCredentialsDto } from './dtos/signin-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  public async signUp(authCredentialsDto: SignUpCredentialsDto): Promise<void> {
    try {
      Logger.verbose(`Adding a new user with data : ${authCredentialsDto}`);
      return await this.usersRepository.createUser(authCredentialsDto);
    } catch (err) {
      if (+err.code == UserErrors.DuplicateName) {
        const constraint = err.constraint;

        if (constraint == 'users_email_key') {
          throw new ConflictException('Email is Taken');
        } else if (constraint == 'users_username_key') {
          throw new ConflictException('Username is Taken');
        }

        throw new ConflictException('Username or email already in use');
      } else {
        Logger.error(`Error signing up ${err}`);
        throw new InternalServerErrorException();
      }
    }
  }

  public async signIn(
    authCredentialsDto: SignInCredentialsDto,
  ): Promise<{ data: { token: string } }> {
    Logger.verbose(`Signing in with data : ${authCredentialsDto}`);
    const { email, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
      relations: ['roles'],
    });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const roles = user.roles.map((r) => r.name);
      const username = user.username;
      const payload: JwtPayload = { username, email, roles };
      const accessToken: string = this.jwtService.sign(payload);

      return { data: { token: accessToken } };
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }
}
