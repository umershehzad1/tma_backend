import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import Customer from "./Customer";
import GuestUser from "./GuestUser";
interface IShippingInfo {
	id?: number;
	customer_id?: number;
	address1: string;
	address2?: string;
	city: string;
	state: string;
	country: string;
	postal_code?: number;
	phone: number;
	guestId?: number;
}

@Table({
	tableName: "shipping_infos",
	timestamps: true,
})
export default class ShippingInfo extends Model<IShippingInfo> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;
	@ForeignKey(() => Customer)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare customer_id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare address1: string;

	@Column({
		type: DataType.STRING,
	})
	declare address2: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare city: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare state: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare country: string;

	@Column({
		type: DataType.INTEGER,
	})
	declare postal_code: number;
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare phone: number;

	@ForeignKey(() => GuestUser)
	@Column({
		type: DataType.INTEGER,
	})
	declare guestId: number;
	@BelongsTo(() => GuestUser)
	declare guestUser: GuestUser;
}
