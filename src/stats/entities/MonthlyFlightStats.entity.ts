import { Column, Entity, Index } from "typeorm";

@Index("monthly_flight_stats_pkey", ["yearMonth"], { unique: true })
@Entity("monthly_flight_stats", { schema: "public" })
export class MonthlyFlightStats {
  @Column("date", { primary: true, name: "year_month" })
  yearMonth: string;

  @Column("integer", { name: "total_flights", nullable: true })
  totalFlights: number | null;

  @Column("integer", {
    name: "landed_flights",
    nullable: true,
    default: () => "0",
  })
  landedFlights: number | null;

  @Column("integer", { name: "delayed_flights", nullable: true })
  delayedFlights: number | null;

  @Column("integer", { name: "cancelled_flights", nullable: true })
  cancelledFlights: number | null;
}
