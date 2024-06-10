import {
	Table,
	Column,
	Model,
	HasMany,
	DataType,
	BelongsTo,
	ForeignKey,
} from "sequelize-typescript";
import Order from "@model/Order";
import Cart from "@model/Cart";
import FavProduct from "@model/FavoritedProduct";
interface ICustomer {
	id?: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	profile_image?: string;
}

@Table({
	tableName: "customers",
	timestamps: true,
})
export default class Customer extends Model<ICustomer> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		type: DataType.INTEGER,
	})
	id!: number;
	@Column({
		allowNull: false,
		type: DataType.STRING,
	})
	first_name!: string;
	@Column({
		allowNull: false,
		type: DataType.STRING,
	})
	last_name!: string;
	@Column({
		allowNull: false,
		type: DataType.STRING,
		unique: true,
	})
	email!: string;
	@Column({
		allowNull: false,
		type: DataType.STRING,
	})
	password!: string;
	@ForeignKey(() => Cart)
	cart_id!: number;
	@HasMany(() => Order)
	orders!: Order[];
	@BelongsTo(() => Cart)
	cart!: Cart;
	@HasMany(() => FavProduct)
	favorites!: FavProduct[];
}
