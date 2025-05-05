import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flights } from 'src/flights/entities/Flights.entity';

export enum RegistrationStatus {
  Open = 'open',
  Closed = 'closed',
}

@Index('registrations_pkey', ['id'], { unique: true })
@Entity('registrations', { schema: 'public' })
export class Registration {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('enum', {
    name: 'registration_status',
    enum: RegistrationStatus,
  })
  registrationStatus: RegistrationStatus;

  @ManyToOne(() => Flights, (flight) => flight.registrations)
  @JoinColumn([{ name: 'flight_id', referencedColumnName: 'id' }])
  flight: Flights;

  @Column('timestamp without time zone', {
    name: 'started_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startedAt: Date;

  @Column('timestamp without time zone', {
    name: 'closed_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  closedAt: Date;
}
