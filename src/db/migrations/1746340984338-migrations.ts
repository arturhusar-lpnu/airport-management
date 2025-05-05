import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746340984338 implements MigrationInterface {
  name = 'Migrations1746340984338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "registrations" DROP CONSTRAINT "FK_b06d6dff44d4db54b8c4e5b64c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registrations" ALTER COLUMN "flight_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "registrations" DROP CONSTRAINT "REL_b06d6dff44d4db54b8c4e5b64c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registrations" ADD CONSTRAINT "FK_b06d6dff44d4db54b8c4e5b64c1" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "registrations" DROP CONSTRAINT "FK_b06d6dff44d4db54b8c4e5b64c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registrations" ADD CONSTRAINT "REL_b06d6dff44d4db54b8c4e5b64c" UNIQUE ("flight_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "registrations" ALTER COLUMN "flight_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "registrations" ADD CONSTRAINT "FK_b06d6dff44d4db54b8c4e5b64c1" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
