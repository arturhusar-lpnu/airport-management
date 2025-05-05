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
import { Users } from 'src/users/entities/Users.entity';
import { SeatClass } from '../enums/seat_class.enum';

@Index('tickets_pkey', ['id'], { unique: true })
@Index('idx_price', ['price'], {})
@Entity('tickets', { schema: 'public' })
export class Tickets {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

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
    enum: SeatClass,
  })
  seatClass: SeatClass | null;

  @OneToMany(
    () => RegisteredTickets,
    (registeredTickets) => registeredTickets.ticket,
  )
  registeredTickets: RegisteredTickets[];

  @ManyToOne(() => Flights, (flights) => flights.tickets)
  @JoinColumn([{ name: 'flight_id', referencedColumnName: 'id' }])
  flight: Flights;

  @ManyToOne(() => Users, (users) => users.tickets)
  @JoinColumn([{ name: 'passenger_id', referencedColumnName: 'id' }])
  passenger: Users;

  @ManyToOne(() => Users, (users) => users.purchasedTickets)
  @JoinColumn([{ name: 'purchased_by_id', referencedColumnName: 'id' }])
  purchasedBy: Users;
}
