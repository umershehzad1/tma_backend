import { Table, Column, Model, DataType } from "sequelize-typescript";
interface ICollection {
	title: string;
	collection_url: string;
	description: string;
	image: string;
	id: string;
	tags: string;
	handle: string;
}
@Table({
	tableName: "collections",
})
export default class Collection extends Model<
	Omit<ICollection, "id" | "image" | "collection_url">
> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	title!: string;
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	description!: string;
	@Column({
		unique: true,
		type: DataType.STRING,
		allowNull: false,
	})
	handle!: string;
	@Column({
		type: DataType.STRING,
	})
	image!: string;
	@Column({
		type: DataType.STRING,
	})
	collection_url!: string;
	@Column({
		type: DataType.STRING,
	})
	tags!: string;
}
