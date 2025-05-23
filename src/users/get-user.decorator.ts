import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from './entities/Users.entity';
import { JwtPayload } from 'src/auth/jwt/jwt-payload.interface';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
