import { Model, Table, Column, DataType } from "sequelize-typescript";
interface IProduct {
	available: boolean;
	featured_image: string;
	price: number;
	handle: string;
	title: string;
	description: string;
	status: "active" | "draft";
}
@Table({
	tableName: "products",
	timestamps: true,
})
export default class Product extends Model<IProduct> {}
