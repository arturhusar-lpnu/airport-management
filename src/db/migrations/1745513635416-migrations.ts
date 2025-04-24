import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1745513635416 implements MigrationInterface {
  name = 'Migrations1745513635416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."tickets_seat_class_enum" RENAME TO "tickets_seat_class_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."flight_prices_seat_class_enum" AS ENUM('business', 'economy')`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight_prices" ALTER COLUMN "seat_class" TYPE "public"."flight_prices_seat_class_enum" USING "seat_class"::"text"::"public"."flight_prices_seat_class_enum"`,
    );
    //await queryRunner.query(`DROP TYPE "public"."tickets_seat_class_enum_old CASCADE"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `CREATE TYPE "public"."tickets_seat_class_enum_old" AS ENUM('economy', 'business')`,
    // );
    await queryRunner.query(
      `ALTER TABLE "flight_prices" ALTER COLUMN "seat_class" TYPE "public"."tickets_seat_class_enum_old" USING "seat_class"::"text"::"public"."tickets_seat_class_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."flight_prices_seat_class_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."tickets_seat_class_enum_old" RENAME TO "tickets_seat_class_enum"`,
    );
  }
}
