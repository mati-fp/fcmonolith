import request from 'supertest';
import { app } from '../express';
import { Sequelize } from 'sequelize-typescript';
import { createSequelizeInstance, migrator } from '../../database/migrator';
import { ProductModel as ProductAdmModel } from '../../../modules/product-adm/repository/product.model';
import { ProductModel as ProductCatalogModel } from '../../../modules/store-catalog/repository/product.model';
import { QueryInterface } from 'sequelize';
import { Umzug } from 'umzug';

describe('E2E test for product', () => {
    let sequelize: Sequelize;
    let migration: Umzug<any>;
    let queryInterface: QueryInterface;

    beforeEach(async () => {
        //sequelize = createSequelizeInstance(':memory:');
        sequelize = createSequelizeInstance();
        sequelize.addModels([ProductAdmModel, ProductCatalogModel]);
        migration = migrator(sequelize);
        await migration.up();
    });

    afterEach(async () => {
        if (!migration || !sequelize) {
            return 
          }
        migration = migrator(sequelize)
        await migration.down({step: 4})
        queryInterface = sequelize.getQueryInterface();
        console.log(await queryInterface.showAllTables());
        await sequelize.close()
    });

    it('should create a product', async () => {

        const response = await request(app)
            .post('/products')
            .send({
                name: 'Product 1',
                description: 'Product 1 description',
                purchasePrice: 100,
                stock: 10
            });

        expect(response.status).toBe(201);
    });
});