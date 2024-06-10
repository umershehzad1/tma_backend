import {
	Table,
	Model,
	Column,
	ForeignKey,
	BelongsTo,
	DataType,
	HasMany,
} from "sequelize-typescript";
import Product from "./Product";
import ProductVariantsOption from "@model/ProductVariantsOptions";
interface IVariantOption {
	availability?: boolean;
	name: string;
	id: number;
	product_id?: number;
}
@Table({
	tableName: "product_variants",
	timestamps: false,
})
export default class ProductVariants extends Model<Omit<IVariantOption, "id">> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
	})
	availability?: boolean;
	@Column({
		type: DataType.STRING,
	})
	name!: string;

	@ForeignKey(() => Product)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	product_id!: number;
	@BelongsTo(() => Product)
	product!: Product;

	@HasMany(() => ProductVariantsOption)
	options!: ProductVariantsOption[];
}
