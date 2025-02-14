import Id from '../../@shared/domain/value-object/id.value-object';
import ClientAdmFacadeFactory from '../../client-adm/factory/client-adm.facade.factory';
import Client from '../domain/client.entity';
import Order from '../domain/order.entity';
import Product from '../domain/product.entity';
import CheckoutGateway from '../gateway/checkout.gateway';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';

export default class CheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        try {
            await OrderModel.create({
                id: order.id.id,
                clientId: order.client.id.id,
                status: order.status,
                orderItems: order.products.map((product) => ({
                    orderId: order.id.id,
                    productId: product.id.id,
                    productName: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice,
                })),
            }, {
                include: [OrderItemModel],
            });
        } catch (err) {
            const error = err as Error;
            console.error('Error adding order:', error);
        }
    }

    async findOrder(id: string): Promise<Order | null> {
        try {
            const order = await OrderModel.findByPk(id, {
                include: [OrderItemModel],
            });
            if (!order) {
                return null;
            }

            const clientAdmFacade = ClientAdmFacadeFactory.create();
            let client;
            try {
                client = await clientAdmFacade.find({ id: order.clientId });
            } catch (error) {
                throw new Error('Client not found');
            }
            return new Order({
                id: new Id(order.id),
                client: new Client({
                    id: new Id(client.id),
                    name: client.name,
                    email: client.email,
                    address: client.address.street,
                }),
                status: order.status,
                products: order.orderItems.map((item) => new Product({
                    id: new Id(item.productId),
                    name: item.productName,
                    description: item.description,
                    salesPrice: item.salesPrice,
                })),
            });
        } catch (error) {
            throw error;
        }
    }
}