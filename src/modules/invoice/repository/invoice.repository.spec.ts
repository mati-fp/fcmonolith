import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/invoice";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item";

describe("ProductRepository test", () => {
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

  it("should create a invoice", async () => {
    const invoiceProps = {
      name: "Invoice 1",
      document: "123456789",
      address: new Address(
        "Street 1",
        "10",
        "Complement 1",
        "City 1",
        "State 1",
        "123456"
      ),
      items: [
        new InvoiceItem({ id: new Id("1"), name: "Item 1", price: 100 }),
        new InvoiceItem({ id: new Id("2"), name: "Item 2", price: 200 }),
      ],
    };
    const invoice = new Invoice(invoiceProps);

    const invoiceRepository = new InvoiceRepository();
    const invoiceDb = await invoiceRepository.generate(invoice);

    expect(invoiceProps.name).toEqual(invoiceDb.name);
    expect(invoiceProps.document).toEqual(invoiceDb.document);
    expect(invoiceProps.address).toEqual(invoiceDb.address);
    expect(invoiceProps.items[0].id).toEqual(invoiceDb.items[0].id);
    expect(invoiceProps.items[0].name).toEqual(invoiceDb.items[0].name);
    expect(invoiceProps.items[0].price).toEqual(invoiceDb.items[0].price);
    expect(invoiceProps.items[1].id).toEqual(invoiceDb.items[1].id);
    expect(invoiceProps.items[1].name).toEqual(invoiceDb.items[1].name);
    expect(invoiceProps.items[1].price).toEqual(invoiceDb.items[1].price);
    expect(invoiceDb.calculateTotal()).toEqual(300);
  });

  it("should find a invoice", async () => {
    const invoiceProps = {
      id: new Id("1"),
      name: "Invoice 1",
      document: "123456789",
      address: new Address(
        "Street 1",
        "10",
        "Complement 1",
        "City 1",
        "State 1",
        "123456"
      ),
      items: [
        new InvoiceItem({ id: new Id("1"), name: "Item 1", price: 100 }),
        new InvoiceItem({ id: new Id("2"), name: "Item 2", price: 200 }),
      ],
    };
    const invoiceEntity = new Invoice(invoiceProps);

    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoiceEntity);

    const invoice = await invoiceRepository.find("1");

    expect(invoice.id.id).toEqual("1");
    expect(invoice.name).toEqual("Invoice 1");
    expect(invoice.document).toEqual("123456789");
    expect(invoice.address.street).toEqual("Street 1");
    expect(invoice.address.number).toEqual("10");
    expect(invoice.address.complement).toEqual("Complement 1");
    expect(invoice.address.city).toEqual("City 1");
    expect(invoice.address.state).toEqual("State 1");
    expect(invoice.address.zipCode).toEqual("123456");
    expect(invoice.items[0].id.id).toEqual("1");
    expect(invoice.items[0].name).toEqual("Item 1");
    expect(invoice.items[0].price).toEqual(100);
    expect(invoice.items[1].id.id).toEqual("2");
    expect(invoice.items[1].name).toEqual("Item 2");
    expect(invoice.items[1].price).toEqual(200);
    expect(invoice.calculateTotal()).toEqual(300);
  });
});
