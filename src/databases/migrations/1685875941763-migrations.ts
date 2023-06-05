import { MigrationInterface, QueryRunner } from 'typeorm'

export class migrations1685875941763 implements MigrationInterface {
  name = 'migrations1685875941763'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "image" character varying DEFAULT 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1683598712~exp=1683599312~hmac=b162c61d181a2e083a7dbb5efc299fb681fa84c42394c4b1d4fbb48a71040b07'
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "image"
        `)
  }
}
