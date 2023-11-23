import { User, UserOrders } from "./user.interface";
import { UserModel } from "./user.model";

const createUserInToDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await UserModel.find(
    {},
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

const deletSingleUserFromDb = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

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

  const result = await UserModel.updateOne(
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

  return result;
};

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

const getOrdersOfSingleUserFromDb = async (userId: number) => {
  const result = await UserModel.findOne({ userId }, { orders: 1 });
  return result;
};

const getAllOrderPriceSingleUserFromDb = async (userId: number) => {
  const result = await UserModel.findOne({ userId });

  if (!result || !result.orders) {
    return null;
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
