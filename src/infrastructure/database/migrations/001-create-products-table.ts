import { QueryInterface, DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("products", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Campo usado pelo módulo product-adm
    purchasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "purchase_price",
    },
    // Campo usado pelo módulo store-catalog
    salesPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "sales_price",
    },
    // Campo usado apenas pelo product-adm
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("products");
};
