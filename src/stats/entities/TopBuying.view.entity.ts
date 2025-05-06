import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'top_buying_days' })
export class TopBuyingDays {
  @ViewColumn()
  count: number;

  @ViewColumn()
  date: Date;

  @ViewColumn()
  seat_class: string;
}
