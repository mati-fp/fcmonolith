import { QueryInterface, DataTypes } from "sequelize";
import Migration from "../migrator";

export class CreateProductsTable implements Migration {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable("products", {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            // Campo usado pelo módulo product-adm
            purchasePrice: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                field: "purchase_price"
            },
            // Campo usado pelo módulo store-catalog
            salesPrice: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                field: "sales_price"
            },
            // Campo usado apenas pelo product-adm
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "created_at"
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "updated_at"
            }
        });
    }

    async down(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.dropTable("products");
    }
}