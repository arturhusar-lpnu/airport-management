import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flights } from 'src/flights/entities/Flights.entity';

@Index('airclines_airline_name_key', ['airlineName'], { unique: true })
@Index('airclines_pkey', ['id'], { unique: true })
@Entity('airlines', { schema: 'public' })
export class Airlines {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'airline_name',
    unique: true,
    length: 100,
  })
  airlineName: string;

  @OneToMany(() => Flights, (flights) => flights.airline)
  flights: Flights[];
}
