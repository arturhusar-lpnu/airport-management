import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGateToFlights1745160970761 implements MigrationInterface {
  name = 'AddGateToFlights1745160970761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "aircrafts" DROP CONSTRAINT "aircrafts_model_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP CONSTRAINT "tickets_flight_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gates" DROP CONSTRAINT "gates_terminal_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "flights_aircraft_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "flights_airline_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight_seats" DROP CONSTRAINT "flight_seats_flight_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" DROP CONSTRAINT "registered_tickets_seat_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" DROP CONSTRAINT "registered_tickets_registered_by_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" DROP CONSTRAINT "registered_tickets_ticket_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" DROP CONSTRAINT "luggages_ticket_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" DROP CONSTRAINT "luggages_passenger_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_role_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_user_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gates" DROP CONSTRAINT "unique_terminals"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD "gate_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "aircraft_models_id_seq" OWNED BY "aircraft_models"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aircraft_models" ALTER COLUMN "id" SET DEFAULT nextval('"aircraft_models_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "aircraft_models" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "aircraft_models" DROP CONSTRAINT "aircraft_models_model_name_key"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "aircrafts_id_seq" OWNED BY "aircrafts"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aircrafts" ALTER COLUMN "id" SET DEFAULT nextval('"aircrafts_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "aircrafts" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "airlines_id_seq" OWNED BY "airlines"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "airlines" ALTER COLUMN "id" SET DEFAULT nextval('"airlines_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "airlines" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "tickets_id_seq" OWNED BY "tickets"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ALTER COLUMN "id" SET DEFAULT nextval('"tickets_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ALTER COLUMN "purchase_at" SET DEFAULT ('now'::text)::date`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."seat_class_enum" RENAME TO "seat_class_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tickets_seat_class_enum" AS ENUM('economy', 'business')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ALTER COLUMN "seat_class" TYPE "public"."tickets_seat_class_enum" USING "seat_class"::"text"::"public"."tickets_seat_class_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."seat_class_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "gates" ADD CONSTRAINT "UQ_7622cecd935cfb9d4b1399c40d6" UNIQUE ("terminal_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "gates" ADD CONSTRAINT "UQ_b5b07c4d511091c29a650c864a9" UNIQUE ("gate_number")`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."flight_type_enum" RENAME TO "flight_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."flights_flight_type_enum" AS ENUM('arriving', 'departing')`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ALTER COLUMN "flight_type" TYPE "public"."flights_flight_type_enum" USING "flight_type"::"text"::"public"."flights_flight_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."flight_type_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."flight_status_enum" RENAME TO "flight_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."flights_status_enum" AS ENUM('scheduled', 'delayed', 'landed', 'cancelled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ALTER COLUMN "status" TYPE "public"."flights_status_enum" USING "status"::"text"::"public"."flights_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."flight_status_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "flights" ALTER COLUMN "schedule_time" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ALTER COLUMN "aircraft_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ALTER COLUMN "airline_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ALTER COLUMN "registered_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ALTER COLUMN "seat_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ALTER COLUMN "ticket_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."luggage_status_enum" RENAME TO "luggage_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."luggages_status_enum" AS ENUM('boarded', 'lost', 'received', 'to_be_received', 'pending')`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" ALTER COLUMN "status" TYPE "public"."luggages_status_enum" USING "status"::"text"::"public"."luggages_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."luggage_status_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "luggages" ALTER COLUMN "passenger_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."roles_enum" RENAME TO "roles_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."roles_name_enum" AS ENUM('passenger', 'terminal_manager', 'admin', 'guest')`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "name" TYPE "public"."roles_name_enum" USING "name"::"text"::"public"."roles_name_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."roles_enum_old"`);
    //await queryRunner.query(`CREATE UNIQUE INDEX "unique_model" ON "aircraft_models" ("model_name") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "aircraft_models_model_name_key" ON "aircraft_models" ("model_name") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "aircraft_models_pkey" ON "aircraft_models" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "aircrafts_pkey" ON "aircrafts" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "airclines_pkey" ON "airlines" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "airclines_airline_name_key" ON "airlines" ("airline_name") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "tickets_pkey" ON "tickets" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "terminals_terminal_name_key" ON "terminals" ("terminal_name") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "terminals_pkey" ON "terminals" ("terminal_id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "gates_pkey" ON "gates" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "unique_terminals" ON "gates" ("gate_number", "terminal_id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "flights_pkey" ON "flights" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "flight_seats_pkey" ON "flight_seats" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "registered_tickets_pkey" ON "registered_tickets" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "luggages_pkey" ON "luggages" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "roles_name_key" ON "roles" ("name") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "roles_pkey" ON "roles" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "users_username_key" ON "users" ("username") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "users_pkey" ON "users" ("id") `);
    // await queryRunner.query(`CREATE UNIQUE INDEX "users_email_key" ON "users" ("email") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "aircrafts" ADD CONSTRAINT "FK_777210b906838726e7aea0ddd2b" FOREIGN KEY ("model_id") REFERENCES "aircraft_models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_b9fc010af4e6764338f776422c2" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gates" ADD CONSTRAINT "FK_7622cecd935cfb9d4b1399c40d6" FOREIGN KEY ("terminal_id") REFERENCES "terminals"("terminal_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_e6dc378d9650637242401040ab1" FOREIGN KEY ("aircraft_id") REFERENCES "aircrafts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_3e5c17e6b2bba063b184d30bbaf" FOREIGN KEY ("airline_id") REFERENCES "airlines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_233bfe3fac3a1cd7086b4ecfc35" FOREIGN KEY ("gate_id") REFERENCES "gates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight_seats" ADD CONSTRAINT "FK_9839100bf9beb379e62b6265bd2" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ADD CONSTRAINT "FK_9ade9381f202c5e07bd7f889d59" FOREIGN KEY ("registered_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ADD CONSTRAINT "FK_0409b3dc8d75bf88e026f496194" FOREIGN KEY ("seat_id") REFERENCES "flight_seats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ADD CONSTRAINT "FK_4de43f44162b314e9c24fe21047" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" ADD CONSTRAINT "FK_df06f6ee7d6eb157faa94c970b2" FOREIGN KEY ("passenger_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" ADD CONSTRAINT "FK_cd30182cf2118d5b8379e1e8f26" FOREIGN KEY ("ticket_id") REFERENCES "registered_tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" DROP CONSTRAINT "FK_cd30182cf2118d5b8379e1e8f26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" DROP CONSTRAINT "FK_df06f6ee7d6eb157faa94c970b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" DROP CONSTRAINT "FK_4de43f44162b314e9c24fe21047"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" DROP CONSTRAINT "FK_0409b3dc8d75bf88e026f496194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" DROP CONSTRAINT "FK_9ade9381f202c5e07bd7f889d59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight_seats" DROP CONSTRAINT "FK_9839100bf9beb379e62b6265bd2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_233bfe3fac3a1cd7086b4ecfc35"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_3e5c17e6b2bba063b184d30bbaf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_e6dc378d9650637242401040ab1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gates" DROP CONSTRAINT "FK_7622cecd935cfb9d4b1399c40d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP CONSTRAINT "FK_b9fc010af4e6764338f776422c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aircrafts" DROP CONSTRAINT "FK_777210b906838726e7aea0ddd2b"`,
    );
    // await queryRunner.query(`DROP INDEX "public"."IDX_87b8888186ca9769c960e92687"`);
    // await queryRunner.query(`DROP INDEX "public"."IDX_b23c65e50a758245a33ee35fda"`);
    // await queryRunner.query(`DROP INDEX "public"."users_email_key"`);
    // await queryRunner.query(`DROP INDEX "public"."users_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."users_username_key"`);
    // await queryRunner.query(`DROP INDEX "public"."roles_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."roles_name_key"`);
    // await queryRunner.query(`DROP INDEX "public"."luggages_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."registered_tickets_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."flight_seats_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."flights_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."unique_terminals"`);
    // await queryRunner.query(`DROP INDEX "public"."gates_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."terminals_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."terminals_terminal_name_key"`);
    // await queryRunner.query(`DROP INDEX "public"."tickets_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."airclines_airline_name_key"`);
    // await queryRunner.query(`DROP INDEX "public"."airclines_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."aircrafts_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."aircraft_models_pkey"`);
    // await queryRunner.query(`DROP INDEX "public"."aircraft_models_model_name_key"`);
    // await queryRunner.query(`DROP INDEX "public"."unique_model"`);
    await queryRunner.query(
      `CREATE TYPE "public"."roles_enum_old" AS ENUM('passenger', 'terminal_manager', 'admin', 'guest')`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "name" TYPE "public"."roles_enum_old" USING "name"::"text"::"public"."roles_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."roles_enum_old" RENAME TO "roles_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" ALTER COLUMN "passenger_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."luggage_status_enum_old" AS ENUM('boarded', 'lost', 'received', 'to_be_received', 'pending')`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" ALTER COLUMN "status" TYPE "public"."luggage_status_enum_old" USING "status"::"text"::"public"."luggage_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."luggages_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."luggage_status_enum_old" RENAME TO "luggage_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ALTER COLUMN "ticket_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ALTER COLUMN "seat_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ALTER COLUMN "registered_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ALTER COLUMN "airline_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ALTER COLUMN "aircraft_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ALTER COLUMN "schedule_time" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."flight_status_enum_old" AS ENUM('scheduled', 'delayed', 'landed', 'cancelled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ALTER COLUMN "status" TYPE "public"."flight_status_enum_old" USING "status"::"text"::"public"."flight_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."flights_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."flight_status_enum_old" RENAME TO "flight_status_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."flight_type_enum_old" AS ENUM('arriving', 'departing')`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ALTER COLUMN "flight_type" TYPE "public"."flight_type_enum_old" USING "flight_type"::"text"::"public"."flight_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."flights_flight_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."flight_type_enum_old" RENAME TO "flight_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gates" DROP CONSTRAINT "UQ_b5b07c4d511091c29a650c864a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gates" DROP CONSTRAINT "UQ_7622cecd935cfb9d4b1399c40d6"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."seat_class_enum_old" AS ENUM('economy', 'business')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ALTER COLUMN "seat_class" TYPE "public"."seat_class_enum_old" USING "seat_class"::"text"::"public"."seat_class_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."tickets_seat_class_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."seat_class_enum_old" RENAME TO "seat_class_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ALTER COLUMN "purchase_at" SET DEFAULT CURRENT_DATE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ALTER COLUMN "id" SET DEFAULT nextval('tickets_ticket_id_seq')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "tickets_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "airlines" ALTER COLUMN "id" SET DEFAULT nextval('airclines_airline_id_seq')`,
    );
    await queryRunner.query(
      `ALTER TABLE "airlines" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "airlines_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "aircrafts" ALTER COLUMN "id" SET DEFAULT nextval('aircrafts_aircraft_id_seq')`,
    );
    await queryRunner.query(
      `ALTER TABLE "aircrafts" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "aircrafts_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "aircraft_models" ADD CONSTRAINT "aircraft_models_model_name_key" UNIQUE ("model_name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "aircraft_models" ALTER COLUMN "id" SET DEFAULT nextval('aircraft_models_model_id_seq')`,
    );
    await queryRunner.query(
      `ALTER TABLE "aircraft_models" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "aircraft_models_id_seq"`);
    await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "gate_id"`);
    await queryRunner.query(
      `ALTER TABLE "gates" ADD CONSTRAINT "unique_terminals" UNIQUE ("terminal_id", "gate_number")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" ADD CONSTRAINT "luggages_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "luggages" ADD CONSTRAINT "luggages_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "registered_tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ADD CONSTRAINT "registered_tickets_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ADD CONSTRAINT "registered_tickets_registered_by_fkey" FOREIGN KEY ("registered_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "registered_tickets" ADD CONSTRAINT "registered_tickets_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "flight_seats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight_seats" ADD CONSTRAINT "flight_seats_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "flights_airline_id_fkey" FOREIGN KEY ("airline_id") REFERENCES "airlines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "flights_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "aircrafts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gates" ADD CONSTRAINT "gates_terminal_id_fkey" FOREIGN KEY ("terminal_id") REFERENCES "terminals"("terminal_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "tickets_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "aircrafts" ADD CONSTRAINT "aircrafts_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "aircraft_models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
