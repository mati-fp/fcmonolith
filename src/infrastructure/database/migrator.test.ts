import { Migrator, createSequelizeInstance } from './migrator';
import { Sequelize } from 'sequelize-typescript';
import { QueryInterface } from 'sequelize';

describe('Migrator', () => {
    let sequelize: Sequelize;
    let queryInterface: QueryInterface;
    let migrator: Migrator;

    beforeEach(async () => {
        // Criar uma nova instância do Sequelize para cada teste
        sequelize = createSequelizeInstance(':memory:');
        queryInterface = sequelize.getQueryInterface();
        migrator = new Migrator(sequelize);
        
        // Não precisamos mais do sync aqui
        // await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    test('should run all migrations up', async () => {
        await migrator.up();
        const tables = await queryInterface.showAllTables();
        expect(tables).toContain('products');
        expect(tables).toContain('clients');
        expect(tables).toContain('invoices');
        expect(tables).toContain('invoice_items');
        expect(tables).toContain('transactions');
    });

    test('should run all migrations down', async () => {
        // Primeiro criamos as tabelas
        await migrator.up();
        // Depois removemos
        await migrator.down();
        
        const tables = await queryInterface.showAllTables();
        expect(tables).not.toContain('products');
        expect(tables).not.toContain('clients');
        expect(tables).not.toContain('invoices');
        expect(tables).not.toContain('invoice_items');
        expect(tables).not.toContain('transactions');
    });
});