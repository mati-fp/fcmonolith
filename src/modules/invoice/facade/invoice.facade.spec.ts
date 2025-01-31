import { Sequelize } from "sequelize-typescript";
import Invoice from "../domain/invoice";
import InvoiceItemModel from "../repository/invoice-items.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/facade.factory";

describe("Invoice Facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate an invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: "Customer 1",
      document: "12345678901",
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345678",
      items: [
        { id: "1", name: "Product 1", price: 100 },
        { id: "2", name: "Product 2", price: 200 },
      ],
    };

    const invoice = await invoiceFacade.generateInvoice(input);

    expect(invoice).toBeDefined();
    expect(invoice.id).toBeDefined();
    expect(invoice.name).toBe(input.name);
    expect(invoice.document).toBe(input.document);
    expect(invoice.street).toBe(input.street);
    expect(invoice.number).toBe(input.number);
    expect(invoice.complement).toBe(input.complement);
    expect(invoice.city).toBe(input.city);
    expect(invoice.state).toBe(input.state);
    expect(invoice.zipCode).toBe(input.zipCode);
    expect(invoice.items).toBeDefined();
    expect(invoice.items.length).toBe(2);
    expect(invoice.items[0].id).toBe(input.items[0].id);
    expect(invoice.items[0].name).toBe(input.items[0].name);
    expect(invoice.items[0].price).toBe(input.items[0].price);
    expect(invoice.items[1].id).toBe(input.items[1].id);
    expect(invoice.items[1].name).toBe(input.items[1].name);
    expect(invoice.items[1].price).toBe(input.items[1].price);
    expect(invoice.total).toBe(300);
    });

    it("should find an invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: "Customer 1",
      document: "12345678901",
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345678",
      items: [
        { id: "1", name: "Product 1", price: 100 },
        { id: "2", name: "Product 2", price: 200 },
      ],
    };

    const invoice = await invoiceFacade.generateInvoice(input);

    const result = await invoiceFacade.findInvoice({ id: invoice.id });

    expect(result).toBeDefined();
    expect(result.id).toBe(invoice.id);
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.address.street).toBe(input.street);
    expect(result.address.number).toBe(input.number);
    expect(result.address.complement).toBe(input.complement);
    expect(result.address.city).toBe(input.city);
    expect(result.address.state).toBe(input.state);
    expect(result.address.zipCode).toBe(input.zipCode);
    expect(result.items).toBeDefined();
    expect(result.items.length).toBe(2);
    expect(result.items[0].id).toBe(input.items[0].id);
    expect(result.items[0].name).toBe(input.items[0].name);
    expect(result.items[0].price).toBe(input.items[0].price);
    expect(result.items[1].id).toBe(input.items[1].id);
    expect(result.items[1].name).toBe(input.items[1].name);
    expect(result.items[1].price).toBe(input.items[1].price);
    expect(result.total).toBe(300);
    });
});