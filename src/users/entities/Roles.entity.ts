import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from '../user_role.enum';
import { Users } from './Users.entity';

@Index('roles_pkey', ['id'], { unique: true })
@Index('roles_name_key', ['name'], { unique: true })
@Entity('roles', { schema: 'public' })
export class Roles {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('enum', {
    name: 'name',
    unique: true,
    enum: UserRoles, //['passenger', 'terminal_manager', 'admin']
  })
  name: UserRoles; //'passenger' | 'terminal_manager' | 'admin'

  @ManyToMany(() => Users, (users) => users.roles)
  @JoinTable({
    name: 'user_roles',
    joinColumns: [{ name: 'role_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
    schema: 'public',
  })
  users: Users[];
}
