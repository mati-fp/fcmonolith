import { QueryInterface, DataTypes } from "sequelize";
import Migration from "../migrator";

export class CreateTransactionsTable implements Migration {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("transactions", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "order_id",
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
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
  }

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("transactions");
  }
}
