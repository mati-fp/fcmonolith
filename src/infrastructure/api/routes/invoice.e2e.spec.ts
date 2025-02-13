import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { createSequelizeInstance, migrator } from "../../database/migrator";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../../modules/invoice/repository/invoice-items.model";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";
import request from 'supertest';
import app from "../express";
import { QueryInterface } from "sequelize";

describe('E2E test for invoice', () => {
    let sequelize: Sequelize;
    let migration: Umzug<any>;
    //let queryInterface: QueryInterface;

    beforeEach(async () => {
        sequelize = createSequelizeInstance(':memory:');
        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        migration = migrator(sequelize);
        await migration.up();
        //await sequelize.sync({ alter: { drop: false } });
        //queryInterface = sequelize.getQueryInterface();
    });

    afterEach(async () => {
        if (!migration || !sequelize) {
            return 
          }
        migration = migrator(sequelize)
        await migration.down({step: 5})
        await sequelize.close()
    });

    it('should find a invoice', async () => {
        //console.log(await queryInterface.describeTable('invoices'));
        //console.log(await queryInterface.describeTable('invoice_items'));
        const invoiceFacade = InvoiceFacadeFactory.create();
        const invoice = await invoiceFacade.generateInvoice({
            name: 'Client 1',
            document: '12345678901',
            street: 'Rua 1',
            number: '123',
            complement: 'Complemento 1',
            city: 'Cidade 1',
            state: 'Estado 1',
            zipCode: '12345678',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    price: 100
                },
                {
                    id: '2',
                    name: 'Item 2',
                    price: 200
                }
            ]
        });
        let response;
        try {
            response = await request(app).get(`/invoice/${invoice.id}`);
        } catch (error) {
            console.log(error)
        }
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(invoice.id);
        expect(response.body.name).toBe(invoice.name);
        expect(response.body.document).toBe(invoice.document);
        expect(response.body.address.street).toBe(invoice.street);
        expect(response.body.address.number).toBe(invoice.number);
        expect(response.body.address.complement).toBe(invoice.complement);
        expect(response.body.address.city).toBe(invoice.city);
        expect(response.body.address.state).toBe(invoice.state);
        expect(response.body.address.zipCode).toBe(invoice.zipCode);
        expect(response.body.items[0].id).toBe(invoice.items[0].id);
        expect(response.body.items[0].name).toBe(invoice.items[0].name);
        expect(response.body.items[0].price).toBe(invoice.items[0].price);
        expect(response.body.items[1].id).toBe(invoice.items[1].id);
        expect(response.body.items[1].name).toBe(invoice.items[1].name);
        expect(response.body.items[1].price).toBe(invoice.items[1].price);
        expect(response.body.total).toBe(invoice.total);

    });
});