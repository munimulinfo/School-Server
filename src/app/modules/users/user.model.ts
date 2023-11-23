import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
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

//rsponse data delet
UsersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj._id;
  delete obj.__v;
  return obj;
};

//Hashing password
UsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

// create userModel schema
export const UserModel = model<User>("user", UsersSchema);
