import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-items.model";
@Table({
    tableName: "invoices",
    timestamps: false,
    })
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false, field: 'name' })
    declare name: string;

    @Column({ allowNull: false, field: 'document' })
    declare document: string;
    
    @Column({ allowNull: false, field: 'street' })
    declare street: string;

    @Column({ allowNull: false, field: 'number' })
    declare number: string;

    @Column({ allowNull: false, field: 'complement' })
    declare complement: string;

    @Column({ allowNull: false, field: 'city' })
    declare city: string;

    @Column({ allowNull: false, field: 'state' })
    declare state: string;

    @Column({ allowNull: false, field: 'zip_code' })
    declare zipCode: string;

    @Column({ allowNull: false, field: 'created_at' })
    declare createdAt: Date;

    @Column({ allowNull: false, field: 'updated_at' })
    declare updatedAt: Date;

    @HasMany(() => InvoiceItemModel)
    declare items?: InvoiceItemModel[];
}