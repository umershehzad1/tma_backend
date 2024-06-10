import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	HasMany,
} from "sequelize-typescript";
import Customer from "@model/Customer";
import OrderItems from "@model/OrderItems";
interface IOrder {
	id?: number;
	customerId?: number;
	guestId?: number;
	status: "in-progress" | "on-way" | "cancelled" | "shipped" | "returned";
}
@Table({
	tableName: "orders",
	timestamps: true,
})
export default class Order extends Model<IOrder> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	id!: number;
	@Column({
		type: DataType.ENUM(
			"in-progress",
			"on-way",
			"cancelled",
			"shipped",
			"returned",
		),
	})
	status!: "in-progress" | "on-way" | "cancelled" | "shipped" | "returned";
	@ForeignKey(() => Customer)
	@Column({
		type: DataType.INTEGER,
	})
	customerId!: number;
	@BelongsTo(() => Customer)
	customer!: Customer;
	@HasMany(() => OrderItems)
	items!: OrderItems[];
}
