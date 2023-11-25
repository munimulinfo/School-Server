import { User, UserOrders } from "./user.interface";
import { UserModel } from "./user.model";
//create user in to database
const createUserInToDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};
// get all user From database
const getAllUserFromDb = async () => {
  const result = await UserModel.find(
    {},
    {
      username: 1,
      email: 1,
      address: 1,
      fullName: 1,
      hobbies: 1,
      isActive: 1,
      age: 1,
    }
  );
  return result;
};

// get single user from database

const getSingleUserFromDb = async (userId: number) => {
  const result = await UserModel.findOne(
    { userId: userId },
    {
      userId: 1,
      username: 1,
      email: 1,
      address: 1,
      fullName: 1,
      hobbies: 1,
      isActive: 1,
      age: 1,
    }
  );
  return result;
};

// single user delet on to db
const deletSingleUserFromDb = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

// single user update in to db

const updateUserInToDb = async (updatedData: User, id: number) => {
  const {
    userId,
    email,
    username,
    password,
    fullName: { firstName, lastName },
    age,
    isActive,
    hobbies,
    address: { street, city, country },
  } = updatedData;

  await UserModel.updateOne(
    { userId: id },
    {
      $set: {
        userId,
        email,
        username,
        password,
        fullName: { firstName, lastName },
        age,
        isActive,
        hobbies,
        address: { street, city, country },
      },
    }
  );

  const updateUser = await UserModel.findOne({ userId: id });

  return updateUser;
};

// updates user orders in to db
const userOrdersCreateInToDb = async (newOrder: UserOrders, id: number) => {
  const result = await UserModel.updateOne(
    { userId: id },
    {
      $push: {
        orders: {
          $each: [newOrder],
        },
      },
    }
  );
  return result;
};

// get all order int to single user
const getOrdersOfSingleUserFromDb = async (userId: number) => {
  const result = await UserModel.findOne({ userId: userId }, { orders: 1 });
  if (!result) {
    throw new Error("user not found");
  }
  return result;
};

// get total price int to db
const getAllOrderPriceSingleUserFromDb = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  if (!result || !result.orders) {
    throw new Error("user not found");
  }
  // Calculate total price
  const totalPrice = result.orders.reduce((total, order) => {
    const totalOrderPrice = order.price * order.quantity;
    return total + totalOrderPrice;
  }, 0);

  return totalPrice;
};

export const userServices = {
  createUserInToDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  deletSingleUserFromDb,
  updateUserInToDb,
  userOrdersCreateInToDb,
  getOrdersOfSingleUserFromDb,
  getAllOrderPriceSingleUserFromDb,
};
