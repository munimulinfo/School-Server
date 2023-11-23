"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userNameSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .required()
        .trim()
        .max(20)
        .rule({ message: "First Name is Required" }),
    lastName: joi_1.default.string()
        .required()
        .trim()
        .max(20)
        .rule({ message: "last Name is Required" }),
});
const userAddressSchema = joi_1.default.object({
    street: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
});
const userOrdersSchema = joi_1.default.object({
    productName: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().required(),
});
const userValidationSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    fullName: userNameSchema.required(),
    age: joi_1.default.number().required(),
    email: joi_1.default.string().required().email(),
    isActive: joi_1.default.boolean().required(),
    hobbies: joi_1.default.array().items(joi_1.default.string().required()).required().min(1),
    address: userAddressSchema.required(),
    orders: joi_1.default.array().items(userOrdersSchema).optional(),
});
exports.default = userValidationSchema;
