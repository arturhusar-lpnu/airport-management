import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flights } from './Flights.entity';
import { SeatClass } from 'src/tickets/enums/seat_class.enum';

@Index('flight_prices_pkey', ['id'], { unique: true })
@Entity('flight_prices', { schema: 'public' })
export class FlightPrices {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('enum', { name: 'seat_class', enum: SeatClass })
  seatClass: SeatClass;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ManyToOne(() => Flights, (flights) => flights.flightPrices)
  @JoinColumn([{ name: 'flight_id', referencedColumnName: 'id' }])
  flight: Flights;
}
