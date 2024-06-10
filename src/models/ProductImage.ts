import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import Product from "@model/Product";
interface IProductImage {
	image_url: string;
	product_id: number;
	id: number;
}
@Table({
	tableName: "product_images",
	timestamps: false,
})
export default class ProductImage extends Model<IProductImage> {
	@Column({
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataType.INTEGER,
	})
	id!: number;
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	image_url!: string;
	@ForeignKey(() => Product)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	product_id!: number;
	@BelongsTo(() => Product)
	product!: Product;
}
