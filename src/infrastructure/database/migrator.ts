import { Sequelize } from "sequelize-typescript";
import { CreateProductsTable } from "./migrations/001-create-products-table";
import { CreateClientsTable } from "./migrations/002-create-clients-table";
import { CreateInvoicesTables } from "./migrations/003-create-invoices-tables";
import { CreateTransactionsTable } from "./migrations/004-create-transactions-table";
import { QueryInterface } from "sequelize";

export default interface Migration {
    up(queryInterface: QueryInterface): Promise<void>;
    down(queryInterface: QueryInterface): Promise<void>;
}

export const migrations = [
    new CreateProductsTable(),
    new CreateClientsTable(),
    new CreateInvoicesTables(),
    new CreateTransactionsTable(),
];

export class Migrator {
    constructor(private sequelize: Sequelize) {}

    async up() {
        const queryInterface = this.sequelize.getQueryInterface();
        for (const migration of migrations) {
            await migration.up(queryInterface);
        }
    }

    async down() {
        const queryInterface = this.sequelize.getQueryInterface();
        for (const migration of [...migrations].reverse()) {
            await migration.down(queryInterface);
        }
    }
}

// Função para criar uma instância do Sequelize
export const createSequelizeInstance = (storage: string = '/app/src/infrastructure/database/database.sqlite') => {
    return new Sequelize({
        dialect: 'sqlite',
        storage,
        logging: false,
    });
};