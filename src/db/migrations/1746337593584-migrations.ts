import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746337593584 implements MigrationInterface {
  name = 'Migrations1746337593584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."registrations_registration_status_enum" AS ENUM('open', 'closed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "registrations" ("id" SERIAL NOT NULL, "registration_status" "public"."registrations_registration_status_enum" NOT NULL, "started_at" TIMESTAMP NOT NULL DEFAULT now(), "closed_at" TIMESTAMP NOT NULL DEFAULT now(), "flight_id" integer, CONSTRAINT "REL_b06d6dff44d4db54b8c4e5b64c" UNIQUE ("flight_id"), CONSTRAINT "PK_6013e724d7b22929da9cd7282d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "registrations_pkey" ON "registrations" ("id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "registrations" ADD CONSTRAINT "FK_b06d6dff44d4db54b8c4e5b64c1" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "registrations" DROP CONSTRAINT "FK_b06d6dff44d4db54b8c4e5b64c1"`,
    );
    await queryRunner.query(`DROP INDEX "public"."registrations_pkey"`);
    await queryRunner.query(`DROP TABLE "registrations"`);
    await queryRunner.query(
      `DROP TYPE "public"."registrations_registration_status_enum"`,
    );
  }
}
