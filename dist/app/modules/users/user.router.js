"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_contoler_1 = require("./user.contoler");
const router = express_1.default.Router();
router.post("/users", user_contoler_1.userContoller.createUser);
router.get("/users", user_contoler_1.userContoller.getAllUser);
router.get("/users/:userId", user_contoler_1.userContoller.getSingleUser);
router.delete("/users/:userId", user_contoler_1.userContoller.deletSingleUser);
router.put("/users/:userId", user_contoler_1.userContoller.updateSingleUser);
router.put("/users/:userId/orders", user_contoler_1.userContoller.createUserOrders);
router.get("/users/:userId/orders", user_contoler_1.userContoller.getOrdersSingleUser);
router.get("/users/:userId/orders/total-price", user_contoler_1.userContoller.getTotalPriceSingleUserOrder);
exports.userRoutes = router;
