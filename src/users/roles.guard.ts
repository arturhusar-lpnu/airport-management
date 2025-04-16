import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
// import { Roles } from 'src/users/entities/Roles.entity';
// import { Users } from './users/entities/Users.entity';
import { ROLES_KEY } from './roles.decorator';
import { JwtPayload } from 'src/auth/jwt/jwt-payload.interface';
import { UserRoles } from './user_role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<UserRoles[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    if (!user || !roles.some((role) => user.roles.includes(role))) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    return true;
  }
}
