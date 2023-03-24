import { MigrationInterface, QueryRunner } from 'typeorm'

export class migrations1678517029916 implements MigrationInterface {
  name = 'migrations1678517029916'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "application"
            ADD "time_used" integer NOT NULL
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "application" DROP COLUMN "time_used"
        `)
  }
}
