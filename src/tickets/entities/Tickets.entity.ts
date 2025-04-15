import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegisteredTickets } from './RegisteredTickets.entity';
import { Flights } from 'src/flights/entities/Flights.entity';

@Index('tickets_pkey', ['id'], { unique: true })
@Index('f_idx_tickets_pass', ['passengerId'], {})
@Index('idx_price', ['price'], {})
@Entity('tickets', { schema: 'public' })
export class Tickets {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'passenger_id' })
  passengerId: number;

  @Column('numeric', { name: 'price', precision: 6, scale: 2 })
  price: string;

  @Column('timestamp without time zone', {
    name: 'purchase_at',
    nullable: true,
    default: () => 'CURRENT_DATE',
  })
  purchaseAt: Date | null;

  @Column('enum', {
    name: 'seat_class',
    nullable: true,
    enum: ['economy', 'business'],
  })
  seatClass: 'economy' | 'business' | null;

  @OneToMany(
    () => RegisteredTickets,
    (registeredTickets) => registeredTickets.ticket,
  )
  registeredTickets: RegisteredTickets[];

  @ManyToOne(() => Flights, (flights) => flights.tickets)
  @JoinColumn([{ name: 'flight_id', referencedColumnName: 'id' }])
  flight: Flights;
}
