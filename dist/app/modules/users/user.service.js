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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
//create user in to database
const createUserInToDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
// get all user From database
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find({}, {
        username: 1,
        email: 1,
        address: 1,
        fullName: 1,
        hobbies: 1,
        isActive: 1,
        age: 1,
    });
    return result;
});
// get single user from database
const getSingleUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId: userId }, {
        userId: 1,
        username: 1,
        email: 1,
        address: 1,
        fullName: 1,
        hobbies: 1,
        isActive: 1,
        age: 1,
    });
    return result;
});
// single user delet on to db
const deletSingleUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.deleteOne({ userId });
    return result;
});
// single user update in to db
const updateUserInToDb = (updatedData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, email, username, password, fullName: { firstName, lastName }, age, isActive, hobbies, address: { street, city, country }, } = updatedData;
    yield user_model_1.UserModel.updateOne({ userId: id }, {
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
    });
    const updateUser = yield user_model_1.UserModel.findOne({ userId: id });
    return updateUser;
});
// updates user orders in to db
const userOrdersCreateInToDb = (newOrder, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne({ userId: id }, {
        $push: {
            orders: {
                $each: [newOrder],
            },
        },
    });
    return result;
});
// get all order int to single user
const getOrdersOfSingleUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId: userId }, { orders: 1 });
    if (!result) {
        throw new Error("user not found");
    }
    return result;
});
// get total price int to db
const getAllOrderPriceSingleUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId });
    if (!result || !result.orders) {
        throw new Error("user not found");
    }
    // Calculate total price
    const totalPrice = result.orders.reduce((total, order) => {
        const totalOrderPrice = order.price * order.quantity;
        return total + totalOrderPrice;
    }, 0);
    return totalPrice;
});
exports.userServices = {
    createUserInToDb,
    getAllUserFromDb,
    getSingleUserFromDb,
    deletSingleUserFromDb,
    updateUserInToDb,
    userOrdersCreateInToDb,
    getOrdersOfSingleUserFromDb,
    getAllOrderPriceSingleUserFromDb,
};
