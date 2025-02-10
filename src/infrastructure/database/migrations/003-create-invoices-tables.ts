import { QueryInterface, DataTypes } from "sequelize";
import Migration from "../migrator";

export class CreateInvoicesTables implements Migration {
  async up(queryInterface: QueryInterface): Promise<void> {
    // Primeiro criamos a tabela principal de invoices
    await queryInterface.createTable("invoices", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "zip_code",
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

    // Depois criamos a tabela de items com a chave estrangeira
    await queryInterface.createTable("invoice_items", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      invoiceId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "invoice_id",
        references: {
          model: "invoices",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
  }

  async down(queryInterface: QueryInterface): Promise<void> {
    // Na remoção, primeiro removemos a tabela que tem a chave estrangeira
    await queryInterface.dropTable("invoice_items");
    await queryInterface.dropTable("invoices");
  }
}
