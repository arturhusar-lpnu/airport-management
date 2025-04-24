import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/repositories/users.repository';
import { UserErrors } from './enums/user-errors.enum';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      console.log(authCredentialsDto);
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
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
  }

  public async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, email, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({
      where: {
        username,
        email,
      },
      relations: ['roles'],
    });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const roles = user.roles.map((r) => r.name);
      const payload: JwtPayload = { username, email, roles };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }
}
