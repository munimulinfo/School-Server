"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    userId: {
        type: Number,
        required: [true, "UserId is must be unique"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "User Name is must be unique"],
        unique: true,
        trim: true,
    },
    password: { type: String, trim: true },
    email: {
        type: String,
        required: [true, "Email must be unique"],
        unique: true,
        trim: true,
    },
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
    try {
        const obj = this.toObject();
        delete obj.password;
        delete obj._id;
        delete obj.__v;
        return obj;
    }
    catch (error) {
        throw new Error(`${error}`);
    }
};
//Hashing password
UsersSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(this.password, salt);
        this.password = hash;
        next();
    });
});
// create userModel schema
exports.UserModel = (0, mongoose_1.model)("user", UsersSchema);
