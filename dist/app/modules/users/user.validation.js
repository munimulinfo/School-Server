"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userNameSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().trim().max(20).messages({
        "string.base": "First Name must be a string",
        "string.trim": "First Name cannot have leading or trailing whitespaces",
        "string.max": "First Name must be at most 20 characters",
        "any.required": "First Name is Required",
    }),
    lastName: joi_1.default.string().required().trim().max(20).messages({
        "string.base": "lastNmae Name must be a string",
        "string.trim": "lastNmae Name cannot have leading or trailing whitespaces",
        "string.max": "lastNmae Name must be at most 20 characters",
        "any.required": "lastNmae Name is Required",
    }),
});
const userAddressSchema = joi_1.default.object({
    street: joi_1.default.string().required().messages({
        "string.base": "Street must be a string",
        "any.required": "Street is Required",
    }),
    city: joi_1.default.string().required().messages({
        "string.base": "city must be a string",
        "any.required": "city is Required",
    }),
    country: joi_1.default.string().required().messages({
        "string.base": "country must be a string",
        "any.required": "country is Required",
    }),
});
const userOrdersSchema = joi_1.default.object({
    productName: joi_1.default.string().required().messages({
        "string.base": " productName must be a string",
        "any.required": " productName is Required",
    }),
    price: joi_1.default.number().required().messages({
        "number.base": "Price must be a number",
        "any.required": "Price is Required",
    }),
    quantity: joi_1.default.number().required().messages({
        "number.base": " quantity must be a number",
        "any.required": " quantity is Required",
    }),
});
const userValidationSchema = joi_1.default.object({
    userId: joi_1.default.number().required().messages({
        "number.base": "User ID must be a number",
        "any.required": "User ID is Required",
    }),
    username: joi_1.default.string().required().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username is Required",
        "any.required": "Username is Required",
    }),
    password: joi_1.default.string().required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is Required",
        "any.required": "Password is Required",
    }),
    fullName: userNameSchema.required(),
    age: joi_1.default.number().required().messages({
        "number.base": "Age must be a number",
        "any.required": "Age is Required",
    }),
    email: joi_1.default.string().required().email().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is Required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is Required",
    }),
    isActive: joi_1.default.boolean().required().messages({
        "boolean.base": "isActive must be a boolean",
        "any.required": "isActive is Required",
    }),
    hobbies: joi_1.default.array()
        .items(joi_1.default.string().required())
        .required()
        .min(1)
        .messages({
        "array.base": "Hobbies must be an array",
        "array.min": "At least one hobby is required",
        "any.required": "Hobbies are Required",
    }),
    address: userAddressSchema.required(),
    orders: joi_1.default.array().items(userOrdersSchema).optional(),
});
exports.default = userValidationSchema;
