import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    try {
        const productData = {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            salesPrice: product.purchasePrice * 1.42,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await ProductModel.create(productData);
    } catch (err) {
        const error = err as Error;
        console.error('Error adding product:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Validation failed:', error);
        }
        throw error;
    }
}
  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }
}
