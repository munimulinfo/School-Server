import Joi from "joi";

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .rule({ message: "First Name is Required" }),
  lastName: Joi.string()
    .required()
    .trim()
    .max(20)
    .rule({ message: "last Name is Required" }),
});

const userAddressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

const userOrdersSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const userValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: userNameSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().required().email(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string().required()).required().min(1),
  address: userAddressSchema.required(),
  orders: Joi.array().items(userOrdersSchema).optional(),
});

export default userValidationSchema;
