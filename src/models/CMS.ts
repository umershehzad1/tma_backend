import { Table, Column, Model, DataType } from "sequelize-typescript";
interface ICMS {
	id: number;
	privacy_policy: string;
	terms_conditions: string;
}

@Table({
	tableName: "cms",
	timestamps: false,
})
export default class CMS extends Model<ICMS> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	declare id: number;
	@Column
	declare privacy_policy: string;
	@Column
	declare terms_conditions: string;
}
