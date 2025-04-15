import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flights } from './Flights.entity';
import { RegisteredTickets } from 'src/tickets/entities/RegisteredTickets.entity';

@Index('flight_seats_pkey', ['id'], { unique: true })
@Entity('flight_seats', { schema: 'public' })
export class FlightSeats {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'seat_number', length: 5 })
  seatNumber: string;

  @ManyToOne(() => Flights, (flights) => flights.flightSeats)
  @JoinColumn([{ name: 'flight_id', referencedColumnName: 'id' }])
  flight: Flights;

  @OneToMany(
    () => RegisteredTickets,
    (registeredTickets) => registeredTickets.seat,
  )
  registeredTickets: RegisteredTickets[];
}
