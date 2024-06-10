import {
	Model,
	Table,
	Column,
	ForeignKey,
	DataType,
	BelongsTo,
} from "sequelize-typescript";
import ProductVariants from "./ProductVariants";

interface IProductVariantOptions {
	name: string;
	id: number;
	variant_id: number;
	image_url?: string;
	price: number;
	quantity: number;
}

@Table({
	tableName: "product_variants_options",
	timestamps: false,
})
export default class ProductVariantOptions extends Model<
	Omit<IProductVariantOptions, "id">
> {
	@Column({
		autoIncrement: true,
		type: DataType.INTEGER,
		primaryKey: true,
	})
	id!: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name!: string;

	@Column({
		type: DataType.STRING,
	})
	image_url!: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	price!: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	quantity!: number;

	@ForeignKey(() => ProductVariants)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	variant_id!: number;

	@BelongsTo(() => ProductVariants)
	variant!: ProductVariants;
}
