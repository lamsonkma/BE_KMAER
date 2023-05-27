import { MigrationInterface, QueryRunner } from 'typeorm'

export class migrations1685201665856 implements MigrationInterface {
  name = 'migrations1685201665856'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "otp" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "code" character varying NOT NULL,
                "user_id" integer,
                CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "user" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "name" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "device" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "image" character varying NOT NULL,
                "token" character varying NOT NULL,
                CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "rule" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "start_time" character varying NOT NULL,
                "end_time" character varying NOT NULL,
                "enabled" boolean NOT NULL DEFAULT false,
                "application_id" integer,
                CONSTRAINT "PK_a5577f464213af7ffbe866e3cb5" PRIMARY KEY ("id")
            )
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
            CREATE TABLE "usage" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "day_of_week" "public"."usage_day_of_week_enum" NOT NULL,
                "total_time_in_foreground" numeric(10, 2) NOT NULL DEFAULT '0',
                "application_id" integer,
                CONSTRAINT "PK_7bc33e71ab6c3b71eac72950b44" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "application" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "package" character varying NOT NULL,
                "image" character varying,
                "device_id" integer,
                CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "device_users_user_" (
                "device_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_39351b142a71886a95fe3bc3d3a" PRIMARY KEY ("device_id", "user_id")
            )
        `)
    await queryRunner.query(`
            CREATE INDEX "IDX_300122a268d1b919921fe0d2c5" ON "device_users_user_" ("device_id")
        `)
    await queryRunner.query(`
            CREATE INDEX "IDX_7f793ac117a8538010fee83738" ON "device_users_user_" ("user_id")
        `)
    await queryRunner.query(`
            ALTER TABLE "otp"
            ADD CONSTRAINT "FK_258d028d322ea3b856bf9f12f25" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "rule"
            ADD CONSTRAINT "FK_a1c65f2dc1f3e7423e958436d95" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "usage"
            ADD CONSTRAINT "FK_b67d4538047165b082e7ccff6f8" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_e5798669f3a9ca1b719222b5533" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "device_users_user_"
            ADD CONSTRAINT "FK_300122a268d1b919921fe0d2c59" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
    await queryRunner.query(`
            ALTER TABLE "device_users_user_"
            ADD CONSTRAINT "FK_7f793ac117a8538010fee837382" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "device_users_user_" DROP CONSTRAINT "FK_7f793ac117a8538010fee837382"
        `)
    await queryRunner.query(`
            ALTER TABLE "device_users_user_" DROP CONSTRAINT "FK_300122a268d1b919921fe0d2c59"
        `)
    await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_e5798669f3a9ca1b719222b5533"
        `)
    await queryRunner.query(`
            ALTER TABLE "usage" DROP CONSTRAINT "FK_b67d4538047165b082e7ccff6f8"
        `)
    await queryRunner.query(`
            ALTER TABLE "rule" DROP CONSTRAINT "FK_a1c65f2dc1f3e7423e958436d95"
        `)
    await queryRunner.query(`
            ALTER TABLE "otp" DROP CONSTRAINT "FK_258d028d322ea3b856bf9f12f25"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."IDX_7f793ac117a8538010fee83738"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."IDX_300122a268d1b919921fe0d2c5"
        `)
    await queryRunner.query(`
            DROP TABLE "device_users_user_"
        `)
    await queryRunner.query(`
            DROP TABLE "application"
        `)
    await queryRunner.query(`
            DROP TABLE "usage"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."usage_day_of_week_enum"
        `)
    await queryRunner.query(`
            DROP TABLE "rule"
        `)
    await queryRunner.query(`
            DROP TABLE "device"
        `)
    await queryRunner.query(`
            DROP TABLE "user"
        `)
    await queryRunner.query(`
            DROP TABLE "otp"
        `)
  }
}
