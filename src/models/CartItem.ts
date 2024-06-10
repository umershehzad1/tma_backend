import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import Cart from "@model/Cart";
import Product from "@model/Product";
interface ICartItem {
	id?: number;
	cart_Id: number;
	product_Id: number;
	quantity: number;
	price: number;
}
@Table({
	timestamps: true,
	tableName: "cart_items",
})
export default class CartItems extends Model<ICartItem> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		type: DataType.INTEGER,
	})
	id!: number;
	@ForeignKey(() => Cart)
	@Column
	cart_Id!: number;
	@ForeignKey(() => Product)
	@Column
	product_Id!: number;
	@Column
	quantity!: number;
	@Column
	price!: number;
	@BelongsTo(() => Cart)
	cart!: Cart;
	@BelongsTo(() => Product)
	product!: Product;
}
