import { MigrationInterface, QueryRunner } from 'typeorm'

export class migrations1681578865946 implements MigrationInterface {
  name = 'migrations1681578865946'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "otp" DROP CONSTRAINT "FK_258d028d322ea3b856bf9f12f25"
        `)
    await queryRunner.query(`
            ALTER TABLE "otp"
            ADD CONSTRAINT "FK_258d028d322ea3b856bf9f12f25" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "otp" DROP CONSTRAINT "FK_258d028d322ea3b856bf9f12f25"
        `)
    await queryRunner.query(`
            ALTER TABLE "otp"
            ADD CONSTRAINT "FK_258d028d322ea3b856bf9f12f25" FOREIGN KEY ("user_id") REFERENCES "usage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }
}
