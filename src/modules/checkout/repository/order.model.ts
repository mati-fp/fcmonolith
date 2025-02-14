import { AllowNull, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderItemModel from "./order-item.model";
@Table({
    tableName: "orders"
})
export default class OrderModel extends Model{
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false, field: "status", defaultValue: "pending"})
    declare status: string;

    @Column({allowNull: false, field: "client_id"})
    declare clientId: string;

    @HasMany(() => OrderItemModel)
    declare orderItems: OrderItemModel[];

    @Column({allowNull: false, field: "created_at"})
    declare createdAt: Date;

    @Column({allowNull: false, field: "updated_at"})
    declare updatedAt: Date;
    
}