import { Column, Entity, Index } from 'typeorm';

@Index('gate_workloads_pkey', ['date', 'gateId'], { unique: true })
@Entity('gate_workloads', { schema: 'public' })
export class GateWorkload {
  @Column('integer', { primary: true, name: 'gate_id' })
  gateId: number;

  @Column('integer', { name: 'workload', nullable: true })
  workload: number | null;

  @Column('numeric', { name: 'workload_percent', nullable: true })
  workloadPercent: string | null;

  @Column('date', { primary: true, name: 'date' })
  date: string;
}
