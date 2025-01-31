import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItem from "../domain/invoice-item";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async find(id: string): Promise<Invoice> {
        const invoice  = await InvoiceModel.findOne({
            where: { id },
            include: [InvoiceItemModel],
        });
        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address(invoice.street, invoice.number, invoice.complement, invoice.city, invoice.state, invoice.zipCode),
            items: invoice.items.map(item => (new InvoiceItem({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            }))),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }

    async generate(invoice: Invoice): Promise<Invoice> {
        try {
            const invoiceModel = await InvoiceModel.create({
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
                createdAt: new Date(),
                updatedAt: new Date(),
                items: invoice.items.map(item => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                })),
            }, {
                include: [InvoiceItemModel],
            });
            return new Invoice({
                id: new Id(invoiceModel.id),
                name: invoiceModel.name,
                document: invoiceModel.document,
                address: new Address(invoiceModel.street, invoiceModel.number, invoiceModel.complement, invoiceModel.city, invoiceModel.state, invoiceModel.zipCode),
                items: invoiceModel.items.map(item => (new InvoiceItem({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
                }))),
                createdAt: invoiceModel.createdAt,
                updatedAt: invoiceModel.updatedAt,
            });
        } catch (error) {
            throw error
        }
    }
}