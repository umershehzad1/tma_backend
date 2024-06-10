import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
} from "sequelize-typescript";
import ShippingInfo from "./ShippingInfo";
interface IGuestUser {
	first_name: string;
	last_name: string;
	email: string;
	phoneNo: number;
	id?: number;
}

@Table({
	tableName: "guest_users",
	timestamps: true,
})
export default class GuestUser extends Model<IGuestUser> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		type: DataType.INTEGER,
	})
	id!: number;

	@Column
	first_name!: string;

	@Column
	last_name!: string;

	@Column
	email!: string;

	@Column
	phoneNo!: number;
	@ForeignKey(() => ShippingInfo)
	declare shipping_info: ShippingInfo;
}
