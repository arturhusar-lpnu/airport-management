import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from 'src/users/entities/Users.entity';
import { RegisteredTickets } from 'src/tickets/entities/RegisteredTickets.entity';

@Index('luggages_pkey', ['id'], { unique: true })
@Entity('luggages', { schema: 'public' })
export class Luggages {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('numeric', { name: 'weight', nullable: true, precision: 5, scale: 2 })
  weight: string | null;

  @Column('enum', {
    name: 'status',
    enum: ['boarded', 'lost', 'received', 'to_be_received', 'pending'],
  })
  status: 'boarded' | 'lost' | 'received' | 'to_be_received' | 'pending';

  @ManyToOne(() => Users, (users) => users.luggages)
  @JoinColumn([{ name: 'passenger_id', referencedColumnName: 'id' }])
  passenger: Users;

  @ManyToOne(
    () => RegisteredTickets,
    (registeredTickets) => registeredTickets.luggages,
  )
  @JoinColumn([{ name: 'ticket_id', referencedColumnName: 'id' }])
  ticket: RegisteredTickets;
}
