import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746289740596 implements MigrationInterface {
  name = 'Migrations1746289740596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD "purchased_by_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_417883bc0de57db34794fcc1478" FOREIGN KEY ("purchased_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP COLUMN "purchased_by_id"`,
    );
  }
}
