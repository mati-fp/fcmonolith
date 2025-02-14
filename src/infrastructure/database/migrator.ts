import { Sequelize } from "sequelize-typescript";
import { SequelizeStorage, Umzug } from "umzug";
import { join } from "path";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../modules/invoice/repository/invoice-items.model";
import { ProductModel as ProductModelADM } from "../../modules/product-adm/repository/product.model";
import { ProductModel as ProductModelStorage } from "../../modules/store-catalog/repository/product.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import OrderItemModel from "../../modules/checkout/repository/order-item.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";

// Função para criar uma instância do Sequelize
export const createSequelizeInstance = (
  storage: string = "/app/src/infrastructure/database/database.sqlite"
) => {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage,
    logging: false,
  });
  sequelize.addModels([
    ClientModel,
    InvoiceModel,
    InvoiceItemModel,
    ProductModelADM,
    ProductModelStorage,
    OrderModel,
    OrderItemModel,
    TransactionModel
  ]);

  return sequelize;
};
export const migrator = (sequelize: Sequelize) => {
  return new Umzug({
    migrations: {
      glob: [
        "src/infrastructure/database/migrations/*.{ts,js}",
        {
          cwd: join(__dirname, "../../../"),
          ignore: ["**/*.d.ts", "**/index.ts", "**/index.js"],
        },
      ],
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: undefined,
  });
};
