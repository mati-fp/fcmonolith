import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-items.model";
@Table({
    tableName: "invoices",
    timestamps: false,
    })
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false, field: 'name' })
    name: string;

    @Column({ allowNull: false, field: 'document' })
    document: string;
    
    @Column({ allowNull: false, field: 'street' })
    street: string;

    @Column({ allowNull: false, field: 'number' })
    number: string;

    @Column({ allowNull: false, field: 'complement' })
    complement: string;

    @Column({ allowNull: false, field: 'city' })
    city: string;

    @Column({ allowNull: false, field: 'state' })
    state: string;

    @Column({ allowNull: false, field: 'zip_code' })
    zipCode: string;

    @Column({ allowNull: false, field: 'created_at' })
    createdAt: Date;

    @Column({ allowNull: false, field: 'updated_at' })
    updatedAt: Date;

    @HasMany(() => InvoiceItemModel)
    items: InvoiceItemModel[];
}