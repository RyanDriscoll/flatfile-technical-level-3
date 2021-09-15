import { MigrationInterface, QueryRunner } from 'typeorm'

export class ImagesCreateTableAndRelations1631722039436 implements MigrationInterface {
  name = 'ImagesCreateTableAndRelations1631722039436'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "images" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "name" character varying NOT NULL, "card_id" integer NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_9565df43d340dbb15578f000033" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_9565df43d340dbb15578f000033"`)
    await queryRunner.query(`DROP TABLE "images"`)
  }
}
