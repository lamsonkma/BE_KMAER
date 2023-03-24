import { MigrationInterface, QueryRunner } from 'typeorm'

export class migrations1679671421211 implements MigrationInterface {
  name = 'migrations1679671421211'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "rule"
            ADD "enabled" boolean NOT NULL DEFAULT false
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "rule" DROP COLUMN "enabled"
        `)
  }
}
