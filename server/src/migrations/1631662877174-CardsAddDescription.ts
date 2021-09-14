import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class CardsAddDescription1631662877174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'description',
        type: 'text',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cards', 'description')
  }
}
