import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
} from "sequelize-typescript";
import Product from "./Product";
interface IFeatureProduct {
	product_id: string;
	id?: number;
}
@Table({
	tableName: "featured_products",
	timestamps: false,
})
export default class FeaturedProduct extends Model<IFeatureProduct> {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
	})
	id!: number;
	@ForeignKey(() => Product)
	@Column
	product_id!: string;
}
