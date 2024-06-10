import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import Product from "@model/Product";
import Order from "@model/Order";
interface IOrderItems {
	id: number;
	product_id: number;
	order_id: number;
	quantity: number;
	price: number;
}
@Table({
	tableName: "order_items",
	timestamps: false,
})
export default class OrderItems extends Model<IOrderItems> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		type: DataType.INTEGER,
	})
	id!: number;
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	quantity!: number;
	@ForeignKey(() => Product)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	product_id!: number;
	@ForeignKey(() => Order)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	order_id!: number;
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	price!: number;
	@BelongsTo(() => Product)
	product!: Product;
	@BelongsTo(() => Order)
	order!: Order;
}
