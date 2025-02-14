import { migrator, createSequelizeInstance } from './migrator';
import { Sequelize } from 'sequelize-typescript';
import { QueryInterface } from 'sequelize';
import { Umzug } from 'umzug';

describe('Migrator', () => {
    let sequelize: Sequelize;
    let migration: Umzug<any>;
    let queryInterface: QueryInterface;

    beforeEach(async () => {
        // Criar uma nova instância do Sequelize para cada teste
        sequelize = createSequelizeInstance(':memory:');
        migration = migrator(sequelize);
        queryInterface = sequelize.getQueryInterface();
        await migration.up();
        //await sequelize.sync({ alter: { drop: false } });
    });

    afterEach(async () => {
        try {
            // Revert all migrations at once
            await migration.down({step: 5});
        } finally {
            await sequelize.close();
        }
    });

    test('should run all migrations up', async () => {

        const tables = await queryInterface.showAllTables();
        expect(tables).toContain('products');
        expect(tables).toContain('clients');
        expect(tables).toContain('invoices');
        expect(tables).toContain('invoice_items');
        expect(tables).toContain('transactions');
    });
    test('should run all migrations down', async () => {
        // Revert all migrations
        await migration.down({step: 5});
        
        const tables = await queryInterface.showAllTables();
        expect(tables).not.toContain('products');
        expect(tables).not.toContain('clients');
        expect(tables).not.toContain('invoices');
        expect(tables).not.toContain('invoice_items');
        expect(tables).not.toContain('transactions');
    });
});