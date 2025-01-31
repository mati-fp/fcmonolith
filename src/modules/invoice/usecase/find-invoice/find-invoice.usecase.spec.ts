import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItem from "../../domain/invoice-item";
import FindInvoiceUseCase from "./find-invoice.usecase";

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
const invoice = new Invoice(invoiceProps);

const MockRepository = () => {
    return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn(),
    }
};

describe("Find Invoice UseCase unit test", () => {
    it("should find a invoice", async () => {
        const invoiceRepository = MockRepository();
        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
        const invoiceFound =  await findInvoiceUseCase.execute({id: "1"})

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(invoiceFound.id).toEqual("1");
        expect(invoiceFound.name).toEqual("Invoice 1");
        expect(invoiceFound.document).toEqual("123456789");
        expect(invoiceFound.address.street).toEqual("Street 1");
        expect(invoiceFound.address.number).toEqual("10");
        expect(invoiceFound.address.complement).toEqual("Complement 1");
        expect(invoiceFound.address.city).toEqual("City 1");
        expect(invoiceFound.address.state).toEqual("State 1");
        expect(invoiceFound.address.zipCode).toEqual("123456");
        expect(invoiceFound.items[0].id).toEqual("1");
        expect(invoiceFound.items[0].name).toEqual("Item 1");
        expect(invoiceFound.items[0].price).toEqual(100);
        expect(invoiceFound.items[1].id).toEqual("2");
        expect(invoiceFound.items[1].name).toEqual("Item 2");
        expect(invoiceFound.items[1].price).toEqual(200);
        expect(invoiceFound.total).toEqual(300);

    })
})