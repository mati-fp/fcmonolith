import request from 'supertest';
import { app } from '../express';
import { Sequelize } from 'sequelize-typescript';
import { createSequelizeInstance, migrator } from '../../database/migrator';
import { QueryInterface } from 'sequelize';
import { Umzug } from 'umzug';
import Address from '../../../modules/@shared/domain/value-object/address';
import { ClientModel } from '../../../modules/client-adm/repository/client.model';

describe('E2E test for product', () => {
    let sequelize: Sequelize;
    let migration: Umzug<any>;
    let queryInterface: QueryInterface;

    beforeEach(async () => {
        sequelize = createSequelizeInstance(':memory:');
        sequelize.addModels([ClientModel]);
        migration = migrator(sequelize);
        await migration.up();
    });

    afterEach(async () => {
        if (!migration || !sequelize) {
            return 
          }
        migration = migrator(sequelize)
        await migration.down({step: 4})
        await sequelize.close()
    });

    it('should create a client', async () => {

        const response = await request(app)
            .post('/clients')
            .send({
                name: 'Client 1',
                email: 'client1@gmail.com',
                document: '12345678901',
                street: 'Rua 1',
                number: '123',
                complement: 'Complemento 1',
                city: 'Cidade 1',
                state: 'Estado 1',
                zipCode: '12345678'
            });
        expect(response.status).toBe(201);
    });
});