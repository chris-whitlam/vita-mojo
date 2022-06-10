import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStoresTable1638374345587 implements MigrationInterface {
  private readonly tableName = 'stores';

  async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'int unsigned',
          isNullable: false,
          isGenerated: true,
          isPrimary: true,
          isUnique: true,
          generationStrategy: 'increment',
        },
        {
          name: 'uuid',
          type: 'varchar',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'name',
          type: 'varchar',
          length: '100',
          isNullable: false,
        },
        {
          name: 'status',
          type: 'tinyint',
          isNullable: false,
          default: 1,
        },
        {
          name: 'address',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'url',
          type: 'varchar',
          isNullable: false,
          default: '"vitamojo.com"',
        },
        {
          name: 'email',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'lat',
          type: 'decimal',
          precision: 15,
          scale: 2,
          isNullable: true,
        },
        {
          name: 'long',
          type: 'decimal',
          precision: 15,
          scale: 2,
          isNullable: true,
        },
        {
          name: 'sort_order',
          type: 'int',
          isNullable: true,
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }
}
