import {
	Model,
	Table,
	Column,
	DataType,
	ForeignKey,
	BelongsTo,
	HasMany,
} from "sequelize-typescript";
import Collection from "@model/Collection";
import ProductVariants from "@model/ProductVariants";
import ProductImage from "@model/ProductImage";
interface IProduct {
	available?: boolean;
	
	price: number;
	handle: string;
	title: string;
	quantity: number;
	description: string;
	status?: "active" | "draft";
	collectionId: number;
}
@Table({
	tableName: "products",
	timestamps: true,
})
export default class Product extends Model<IProduct> {
	@Column({
		allowNull: false,
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		
	})
	id!: number;
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
	})
	available!: boolean;
	@Column
	price!: number;
	@Column
	handle!: string;
	@Column
	title!: string;
	@Column
	description!: string;
	@Column
	quantity!: number;
	@Column({
		type: DataType.ENUM("active", "draft"),
		defaultValue: "active",
		allowNull: false,
	})
	status!: "active" | "draft";
	@ForeignKey(() => Collection)
	@Column
	collectionId!: number;
	@BelongsTo(() => Collection)
	collection!: Collection;
	@HasMany(() => ProductVariants)
	variants!: ProductVariants[];
	@HasMany(() => ProductImage)
	images!: ProductImage[];
}
