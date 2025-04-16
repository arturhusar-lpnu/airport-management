import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from '../../users/repositories/users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepository: UsersRepository,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET') ?? '',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const { username, email, roles } = payload;

    const user = await this.usersRepository.findOne({
      where: { username, email },
      relations: ['roles'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    user.roles.forEach((role) => {
      if (!roles.includes(role.name))
        throw new UnauthorizedException('Wrong roles');
    });

    return payload;
  }
}
