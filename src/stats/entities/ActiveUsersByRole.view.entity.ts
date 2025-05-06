import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'active_users_by_role' })
export class ActiveUsersByRole {
  @ViewColumn()
  role_users: number;

  @ViewColumn()
  role_name: string;
}
