import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'most_popular_departing_routes' })
export class MostPopularDepartingRoutes {
  @ViewColumn()
  airport_id: number;

  @ViewColumn()
  airport_name: string;

  @ViewColumn()
  route: string;

  @ViewColumn()
  flights_count: number;
}
