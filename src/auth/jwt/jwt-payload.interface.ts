import { Roles } from 'src/users/entities/Roles.entity';

export interface JwtPayload {
  username: string;
  email: string;
  //roles: Roles[];
}
