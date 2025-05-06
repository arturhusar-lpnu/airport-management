import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'luggage_per_month' })
export class LuggagePerMonth {
  @ViewColumn()
  weight: number;

  @ViewColumn()
  luggage_count: number;

  @ViewColumn()
  month: Date;
}
