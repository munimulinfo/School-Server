import { Schema, model } from "mongoose";
import { User, UserAddress, UserName, UserOrders } from "./user.interface";

//create user full name schema
const UserNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
});
//create user address schema
const UserAddressSchema = new Schema<UserAddress>({
  country: { type: String, trim: true },
  city: { type: String, trim: true },
  street: { type: String, trim: true },
});

//User Orders schema
const UserOrdersSchema = new Schema<UserOrders>({
  productName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// create user main schema
const UsersSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  fullName: {
    type: UserNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  address: {
    type: UserAddressSchema,
    required: true,
  },
  hobbies: {
    type: [String],
  },
  isActive: { type: Boolean, required: true },
  orders: [{ type: UserOrdersSchema }],
});

UsersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj._id;
  delete obj.__v;
  delete obj.orders;
  delete obj.address._id;
  return obj;
};

// create userModel schema
export const UserModel = model<User>("user", UsersSchema);
