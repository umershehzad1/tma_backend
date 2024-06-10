import {
	Column,
	Model,
	DataType,
	Table,
	ForeignKey,
} from "sequelize-typescript";
import Customer from "@model/Customer";
import Product from "@model/Product";
interface IFavProducts {
	id?: number;
	customer_id: number;
	product_id: number;
}
@Table({
	tableName: "fav_products",
	timestamps: true,
})
export default class FavProduct extends Model<IFavProducts> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		type: DataType.INTEGER,
	})
	id!: number;
	@ForeignKey(() => Customer)
	@Column
	customer_id!: number;
	@ForeignKey(() => Product)
	@Column
	product_id!: number;
}
