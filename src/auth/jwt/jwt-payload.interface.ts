import { UserRoles } from 'src/users/user_role.enum';

export interface JwtPayload {
  username: string;
  email: string;
  roles: UserRoles[];
}
