import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flights } from './Flights.entity';

@Index('airports_airport_name_key', ['airportName'], { unique: true })
@Index('airports_pkey', ['id'], { unique: true })
@Entity('airports', { schema: 'public' })
export class Airports {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'city_name', length: 50 })
  cityName: string;

  @Column('character varying', {
    name: 'airport_name',
    unique: true,
    length: 50,
  })
  airportName: string;

  @OneToMany(() => Flights, (flights) => flights.airport)
  flights: Flights[];
}
