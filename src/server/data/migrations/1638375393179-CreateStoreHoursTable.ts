import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStoreHoursTable1638375393179 implements MigrationInterface {
  private readonly tableName = 'store_hours';

  async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'integer unsigned',
          isNullable: false,
          isGenerated: true,
          isPrimary: true,
          isUnique: true,
          generationStrategy: 'increment',
        },
        {
          name: 'store_id',
          type: 'int unsigned',
          isNullable: false,
        },
        {
          name: 'weekday',
          type: 'tinyint',
          isNullable: false,
        },
        {
          name: 'from',
          type: 'time',
          isNullable: false,
        },
        {
          name: 'to',
          type: 'time',
          isNullable: false,
        },
        {
          name: 'type',
          type: 'tinyint',
          isNullable: false,
          default: '1',
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
