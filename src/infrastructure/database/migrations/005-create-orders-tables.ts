// src/infrastructure/database/migrations/005-create-orders-tables.ts
import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("orders", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending",
        },
        client_id: {
            type: DataTypes.STRING,
            allowNull: false,
            // references: {
            //     model: "clients",  // References the clients table
            //     key: "id",
            // },
            // onDelete: "CASCADE",
            // onUpdate: "CASCADE",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    });

    await sequelize.getQueryInterface().createTable("order_items", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "orders",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        product_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sales_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        }
    });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    // Drop tables in reverse order due to foreign key constraints
    await sequelize.getQueryInterface().dropTable("order_items");
    await sequelize.getQueryInterface().dropTable("orders");
};