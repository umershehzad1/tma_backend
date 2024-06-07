import { Column, Table, DataType, Model } from "sequelize-typescript";
import bcrypt from "bcrypt";
interface IAdminUser {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	profile_image: string;
}
@Table({
	timestamps: true,
	tableName: "admin_users",
})
export default class Admin extends Model<
	Omit<IAdminUser, "id" | "createdAt" | "updatedAt" | "profile_image">
> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;
	@Column({
		type: DataType.STRING(40),
		allowNull: false,
	})
	first_name!: string;
	@Column({
		type: DataType.STRING(40),
		allowNull: false,
	})
	last_name!: string;
	@Column({
		type: DataType.STRING(40),
		allowNull: false,
	})
	email!: string;
	@Column({
		type: DataType.STRING,
		allowNull: false,
		// * set method will be used to hash the admin password
		set(value: string) {
			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(value, salt);
			this.setDataValue("password", hash);
		},
	})
	password!: string;
	@Column({
		type: DataType.STRING(100),
	})
	profile_image!: string;
}
