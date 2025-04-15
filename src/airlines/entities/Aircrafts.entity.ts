import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AircraftModels } from './AircraftModels.entity';
import { Flights } from 'src/flights/entities/Flights.entity';

@Index('aircrafts_pkey', ['id'], { unique: true })
@Entity('aircrafts', { schema: 'public' })
export class Aircrafts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'business_seats' })
  businessSeats: number;

  @Column('integer', { name: 'economy_seats' })
  economySeats: number;

  @Column('numeric', { name: 'trunk_capacity', precision: 7, scale: 2 })
  trunkCapacity: string;

  @ManyToOne(() => AircraftModels, (aircraftModels) => aircraftModels.aircrafts)
  @JoinColumn([{ name: 'model_id', referencedColumnName: 'id' }])
  model: AircraftModels;

  @OneToMany(() => Flights, (flights) => flights.aircraft)
  flights: Flights[];
}
