import { Table, Column, Model, DataType } from "sequelize-typescript";
interface IContactQueries {
	first_name: string;
	last_name: string;
	email: string;
	message: string;
}
@Table({
	tableName: "contact_queries",
	timestamps: true,
})
export default class ContactQueries extends Model<IContactQueries> {
	@Column({
		type: DataType.STRING,
	})
	first_name!: string;
	@Column({
		type: DataType.STRING,
	})
	last_name!: string;
	@Column({
		type: DataType.STRING,
	})
	email!: string;
	@Column({
		type: DataType.STRING,
	})
	message!: string;
}
