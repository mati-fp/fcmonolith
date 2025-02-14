import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Order from "./order.model";

@Table({tableName: "order_item", timestamps: false})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({allowNull: false})
    declare id: number;
    
    @ForeignKey(() => Order)
    @Column({allowNull: false, field: "order_id"})
    declare orderId: string;

    @Column({allowNull: false, field: "product_id"})
    declare productId: string;

    @Column({allowNull: false, field: "product_name"})
    declare productName: string;

    @Column({allowNull: false})
    declare description: string;

    @Column({allowNull: false, field: "sales_price"})
    declare salesPrice: number;
}