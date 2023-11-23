"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
//create user full name schema
const UserNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
});
//create user address schema
const UserAddressSchema = new mongoose_1.Schema({
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    street: { type: String, trim: true },
});
//User Orders schema
const UserOrdersSchema = new mongoose_1.Schema({
    productName: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
// create user main schema
const UsersSchema = new mongoose_1.Schema({
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
    return obj;
};
// create userModel schema
exports.UserModel = (0, mongoose_1.model)("user", UsersSchema);
