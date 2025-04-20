import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Terminals } from 'src/terminals/entities/Terminals.entity';
import { Flights } from 'src/flights/entities/Flights.entity';

@Index('unique_terminals', ['gateNumber', 'terminalId'], { unique: true })
@Index('gates_pkey', ['id'], { unique: true })
@Entity('gates', { schema: 'public' })
export class Gates {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'terminal_id', nullable: true, unique: true })
  terminalId: number | null;

  @Column('character varying', { name: 'gate_number', unique: true, length: 5 })
  gateNumber: string;

  @ManyToOne(() => Terminals, (terminals) => terminals.gates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'terminal_id', referencedColumnName: 'terminalId' }])
  terminal: Terminals;

  @OneToMany(() => Flights, (flight) => flight.gate)
  flights: Flights[];
}
