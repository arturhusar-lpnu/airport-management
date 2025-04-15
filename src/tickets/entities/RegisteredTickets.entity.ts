import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Luggages } from 'src/luggage/entities/Luggages.entity';
import { Users } from 'src/users/entities/Users.entity';
import { FlightSeats } from 'src/flights/entities/FlightSeats.entity';
import { Tickets } from './Tickets.entity';

@Index('registered_tickets_pkey', ['id'], { unique: true })
@Entity('registered_tickets', { schema: 'public' })
export class RegisteredTickets {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp without time zone', { name: 'registered_at' })
  registeredAt: Date;

  @OneToMany(() => Luggages, (luggages) => luggages.ticket)
  luggages: Luggages[];

  @ManyToOne(() => Users, (users) => users.registeredTickets)
  @JoinColumn([{ name: 'registered_by', referencedColumnName: 'id' }])
  registeredBy: Users;

  @ManyToOne(() => FlightSeats, (flightSeats) => flightSeats.registeredTickets)
  @JoinColumn([{ name: 'seat_id', referencedColumnName: 'id' }])
  seat: FlightSeats;

  @ManyToOne(() => Tickets, (tickets) => tickets.registeredTickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'ticket_id', referencedColumnName: 'id' }])
  ticket: Tickets;
}
