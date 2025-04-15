import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gates } from 'src/gates/entities/Gates.entity';

@Index('terminals_pkey', ['terminalId'], { unique: true })
@Index('terminals_terminal_name_key', ['terminalName'], { unique: true })
@Entity('terminals', { schema: 'public' })
export class Terminals {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'terminal_id' })
  terminalId: number;

  @Column('character varying', {
    name: 'terminal_name',
    unique: true,
    length: 20,
  })
  terminalName: string;

  @OneToMany(() => Gates, (gates) => gates.terminal)
  gates: Gates[];
}
