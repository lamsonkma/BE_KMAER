import { MigrationInterface, QueryRunner } from 'typeorm'

export class migrations1680511691038 implements MigrationInterface {
  name = 'migrations1680511691038'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "usage" DROP COLUMN "day_of_week"
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."usage_day_of_week_enum" AS ENUM(
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            )
        `)
    await queryRunner.query(`
            ALTER TABLE "usage"
            ADD "day_of_week" "public"."usage_day_of_week_enum" NOT NULL
        `)
    await queryRunner.query(`
            ALTER TABLE "usage" DROP COLUMN "total_time_in_foreground"
        `)
    await queryRunner.query(`
            ALTER TABLE "usage"
            ADD "total_time_in_foreground" numeric(10, 2) NOT NULL DEFAULT '0'
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "usage" DROP COLUMN "total_time_in_foreground"
        `)
    await queryRunner.query(`
            ALTER TABLE "usage"
            ADD "total_time_in_foreground" integer NOT NULL
        `)
    await queryRunner.query(`
            ALTER TABLE "usage" DROP COLUMN "day_of_week"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."usage_day_of_week_enum"
        `)
    await queryRunner.query(`
            ALTER TABLE "usage"
            ADD "day_of_week" character varying NOT NULL
        `)
  }
}
