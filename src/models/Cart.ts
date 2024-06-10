import {
	Model,
	Column,
	DataType,
	Table,
	ForeignKey,
	BelongsTo,
	HasMany,
} from "sequelize-typescript";
import Customer from "@model/Customer";
import CartItems from "@model/CartItem";
interface ICart {
	customerId: number;
	id: number;
}

@Table({
	tableName: "cart",
	timestamps: true,
})
export default class Cart extends Model<ICart> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;
	@ForeignKey(() => Customer)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	customerId!: number;
	@BelongsTo(() => Customer)
	customer!: Customer;
	@HasMany(() => CartItems)
	items!: CartItems[];
}
