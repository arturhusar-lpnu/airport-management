import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Luggages } from 'src/luggage/entities/Luggages.entity';
import { RegisteredTickets } from 'src/tickets/entities/RegisteredTickets.entity';
import { Roles } from 'src/users/entities/Roles.entity';
import { Tickets } from 'src/tickets/entities/Tickets.entity';

@Index('users_email_key', ['email'], { unique: true })
@Index('users_pkey', ['id'], { unique: true })
@Index('users_username_key', ['username'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column('character varying', { name: 'username', unique: true, length: 50 })
  username: string;

  @Column('text', { name: 'password_hash' })
  passwordHash: string;

  @OneToMany(() => Luggages, (luggages) => luggages.passenger)
  luggages: Luggages[];

  @OneToMany(
    () => RegisteredTickets,
    (registeredTickets) => registeredTickets.registeredBy,
  )
  registeredTickets: RegisteredTickets[];

  @ManyToMany(() => Roles, (roles) => roles.users)
  roles: Roles[];

  @OneToMany(() => Tickets, (tickets) => tickets.passenger)
  tickets: Tickets[];

  @OneToMany(() => Tickets, (tickets) => tickets.purchasedBy)
  purchasedTickets: Tickets[];
}
