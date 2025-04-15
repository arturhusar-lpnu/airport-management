import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Aircrafts } from './Aircrafts.entity';

@Index('aircraft_models_pkey', ['id'], { unique: true })
@Index('aircraft_models_model_name_key', ['modelName'], { unique: true })
@Index('unique_model', ['modelName'], { unique: true })
@Entity('aircraft_models', { schema: 'public' })
export class AircraftModels {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'model_name', length: 100 })
  modelName: string;

  @OneToMany(() => Aircrafts, (aircrafts) => aircrafts.model)
  aircrafts: Aircrafts[];
}
