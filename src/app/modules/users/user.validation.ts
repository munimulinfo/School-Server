import Joi from "joi";

const userNameSchema = Joi.object({
  firstName: Joi.string().required().trim().max(20).messages({
    "string.base": "First Name must be a string",
    "string.trim": "First Name cannot have leading or trailing whitespaces",
    "string.max": "First Name must be at most 20 characters",
    "any.required": "First Name is Required",
  }),
  lastName: Joi.string().required().trim().max(20).messages({
    "string.base": "lastNmae Name must be a string",
    "string.trim": "lastNmae Name cannot have leading or trailing whitespaces",
    "string.max": "lastNmae Name must be at most 20 characters",
    "any.required": "lastNmae Name is Required",
  }),
});

const userAddressSchema = Joi.object({
  street: Joi.string().required().messages({
    "string.base": "Street must be a string",
    "any.required": "Street is Required",
  }),
  city: Joi.string().required().messages({
    "string.base": "city must be a string",
    "any.required": "city is Required",
  }),
  country: Joi.string().required().messages({
    "string.base": "country must be a string",
    "any.required": "country is Required",
  }),
});

const userOrdersSchema = Joi.object({
  productName: Joi.string().required().messages({
    "string.base": " productName must be a string",
    "any.required": " productName is Required",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is Required",
  }),
  quantity: Joi.number().required().messages({
    "number.base": " quantity must be a number",
    "any.required": " quantity is Required",
  }),
});

const userValidationSchema = Joi.object({
  userId: Joi.number().required().messages({
    "number.base": "User ID must be a number",
    "any.required": "User ID is Required",
  }),
  username: Joi.string().required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username is Required",
    "any.required": "Username is Required",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is Required",
    "any.required": "Password is Required",
  }),
  fullName: userNameSchema.required(),
  age: Joi.number().required().messages({
    "number.base": "Age must be a number",
    "any.required": "Age is Required",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is Required",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is Required",
  }),
  isActive: Joi.boolean().required().messages({
    "boolean.base": "isActive must be a boolean",
    "any.required": "isActive is Required",
  }),
  hobbies: Joi.array()
    .items(Joi.string().required())
    .required()
    .min(1)
    .messages({
      "array.base": "Hobbies must be an array",
      "array.min": "At least one hobby is required",
      "any.required": "Hobbies are Required",
    }),
  address: userAddressSchema.required(),
  orders: Joi.array().items(userOrdersSchema).optional(),
});

export default userValidationSchema;
