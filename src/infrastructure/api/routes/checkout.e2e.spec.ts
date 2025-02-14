import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { createSequelizeInstance, migrator } from "../../database/migrator";
import request from "supertest";
import app from "../express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import Address from "../../../modules/@shared/domain/value-object/address";

describe("E2E test for checkout", () => {
  let sequelize: Sequelize;
  let migration: Umzug<any>;
  let queryInterface: QueryInterface;
  let product: any;
  let client: any;

  beforeEach(async () => {
    sequelize = createSequelizeInstance(":memory:");
    migration = migrator(sequelize);
    await migration.up();
    //await sequelize.sync({alter: { drop: false }});

    const productAdmFacade = ProductAdmFacadeFactory.create();
    product = {
        id: '1',
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 1000,
        stock: 200,
    }
    await productAdmFacade.addProduct(product);

    const clientFacade = ClientAdmFacadeFactory.create();
    client = {
        id: '1',
        name: 'Client 1',
        email: 'client1@email.com',
        document: '12345678901',
        address: new Address('Rua 1', '123', 'Complemento 1', 'Cidade 1', 'Estado 1', '12345678')
    }
    await clientFacade.add(client);
  });

  afterEach(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down({ step: 5 });
    queryInterface = sequelize.getQueryInterface();
    await sequelize.close();
  });

  it("should create a checkout", async () => {
    const response = await request(app)
        .post("/checkout")
        .send({
            clientId: client.id,
            products: [{ productId: product.id }],
        });
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.status).toBe("approved");
    expect(response.body.total).toBe(1420);
    expect(response.body.products[0].productId).toBeDefined();
    console.log(response.body);
  });
});
