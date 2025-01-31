import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const generatedValue = {
    id: new Id("1"),
    name: "invoice 1",
    document: "123456789",
    address: new Address("rua alabama", "12", "casa", "alvorada", "rs", "1234-000"),
    zipCode: "1234-000",
    items: [new InvoiceItem({id: new Id("1"), name: "laranja", price: 1000}), new InvoiceItem({id: new Id("2"), name: "banana", price: 2000})],
}

const MockRepository = () => {
    return {
      find: jest.fn(),
      generate: jest.fn().mockReturnValue(generatedValue),
    };
};

describe("Generate Invoice unit test", () => {
    it("should generate a invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(invoiceRepository);

        const input = {
            name: "invoice 1",
            document: "123456789",
            street: "rua alabama",
            number: "12",
            complement: "casa",
            city: "alvorada",
            state: "rs",
            zipCode: "1234-000",
            items: [{
              id: "1",
              name: "laranja",
              price: 1000,
            },
            {
                id: "2",
                name: "banana",
                price: 2000,
            }],
        };

        const result = await usecase.execute(input);

        expect(invoiceRepository.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toBe(generatedValue.name);
        expect(result.document).toBe(generatedValue.document);
        expect(result.street).toBe(generatedValue.address.street);
        expect(result.number).toBe(generatedValue.address.number);
        expect(result.complement).toBe(generatedValue.address.complement);
        expect(result.city).toBe(generatedValue.address.city);
        expect(result.state).toBe(generatedValue.address.state);
        expect(result.zipCode).toBe(generatedValue.zipCode);
        expect(result.items[0].id).toBe(generatedValue.items[0].id.id);
        expect(result.items[0].name).toBe(generatedValue.items[0].name);
        expect(result.items[0].price).toBe(generatedValue.items[0].price);
        expect(result.items[1].id).toBe(generatedValue.items[1].id.id);
        expect(result.items[1].name).toBe(generatedValue.items[1].name);
        expect(result.items[1].price).toBe(generatedValue.items[1].price);
        expect(result.total).toBe(3000);
    });
});