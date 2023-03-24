import { MigrationInterface, QueryRunner } from 'typeorm'

export class migrations1678518246139 implements MigrationInterface {
  name = 'migrations1678518246139'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "rule" DROP COLUMN "name"
        `)
    await queryRunner.query(`
            ALTER TABLE "rule" DROP COLUMN "image"
        `)
    await queryRunner.query(`
            ALTER TABLE "rule"
            ADD "start_time" character varying NOT NULL
        `)
    await queryRunner.query(`
            ALTER TABLE "rule"
            ADD "end_time" character varying NOT NULL
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "rule" DROP COLUMN "end_time"
        `)
    await queryRunner.query(`
            ALTER TABLE "rule" DROP COLUMN "start_time"
        `)
    await queryRunner.query(`
            ALTER TABLE "rule"
            ADD "image" character varying NOT NULL
        `)
    await queryRunner.query(`
            ALTER TABLE "rule"
            ADD "name" character varying NOT NULL
        `)
  }
}
