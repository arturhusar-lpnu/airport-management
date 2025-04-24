import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlightSeats } from './FlightSeats.entity';
import { Aircrafts } from 'src/airlines/entities/Aircrafts.entity';
import { Airlines } from 'src/airlines/entities/Airlines.entity';
import { Tickets } from 'src/tickets/entities/Tickets.entity';
import { FlightType } from '../enums/flight-type.enum';
import { FlightStatus } from '../enums/flight_status.enum';
import { Gates } from 'src/gates/entities/Gates.entity';
import { FlightPrices } from './FlightPrices.entity';

@Index('flights_pkey', ['id'], { unique: true })
@Entity('flights', { schema: 'public' })
export class Flights {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'flight_name', length: 100 })
  flightName: string;

  @Column('enum', { name: 'flight_type', enum: FlightType })
  flightType: FlightType;

  @Column('enum', {
    name: 'status',
    enum: FlightStatus,
  })
  status: FlightStatus;

  @Column('timestamp without time zone', {
    name: 'schedule_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  scheduleTime: Date;

  @OneToMany(() => FlightSeats, (flightSeats) => flightSeats.flight)
  flightSeats: FlightSeats[];

  @OneToMany(() => FlightPrices, (flightPrices) => flightPrices.flight)
  flightPrices: FlightPrices[];

  @ManyToOne(() => Aircrafts, (aircrafts) => aircrafts.flights)
  @JoinColumn([{ name: 'aircraft_id', referencedColumnName: 'id' }])
  aircraft: Aircrafts;

  @ManyToOne(() => Airlines, (airlines) => airlines.flights)
  @JoinColumn([{ name: 'airline_id', referencedColumnName: 'id' }])
  airline: Airlines;

  @OneToMany(() => Tickets, (tickets) => tickets.flight)
  tickets: Tickets[];

  @ManyToOne(() => Gates, (gate) => gate.flights, { nullable: false })
  @JoinColumn([{ name: 'gate_id', referencedColumnName: 'id' }])
  gate: Gates;
}
