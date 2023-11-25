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
exports.userContoller = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
//create User From database
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const { error } = user_validation_1.default.validate(user);
        const result = yield user_service_1.userServices.createUserInToDb(user);
        if (error) {
            res.status(500).json({
                success: false,
                message: "User created not successfull",
                error: error.details,
            });
        }
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User created not successfull",
            error: error,
        });
    }
});
//Get All user from data base
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUserFromDb();
        res.status(200).json({
            success: true,
            message: "User fetched Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// get single user by database
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.userId);
        const result = yield user_service_1.userServices.getSingleUserFromDb(id);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Single User fetch Successfully",
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// delet single user by data base
const deletSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.userId);
        const result = yield user_service_1.userServices.deletSingleUserFromDb(id);
        if (result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: "User Deleted Succesfully",
                data: null,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: error,
        });
    }
});
//update single user from data base
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = req.body;
        const id = Number(req.params.userId);
        const result = yield user_service_1.userServices.updateUserInToDb(updatedData, id);
        res.status(200).json({
            success: true,
            message: "User Data Updated succesfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// create orders for single user in data base
const createUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = Number(req.params.userId);
        const newOrder = req.body;
        yield user_service_1.userServices.userOrdersCreateInToDb(newOrder, orderId);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
//get order of single user
const getOrdersSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.userServices.getOrdersOfSingleUserFromDb(userId);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const getTotalPriceSingleUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.userServices.getAllOrderPriceSingleUserFromDb(userId);
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: {
                totalPrice: result,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
exports.userContoller = {
    createUser,
    getAllUser,
    getSingleUser,
    deletSingleUser,
    updateSingleUser,
    createUserOrders,
    getOrdersSingleUser,
    getTotalPriceSingleUserOrder,
};
