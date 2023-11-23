import express from "express";
import { userContoller } from "./user.contoler";

const router = express.Router();

router.post("/users", userContoller.createUser);
router.get("/users", userContoller.getAllUser);
router.get("/users/:userId", userContoller.getSingleUser);
router.delete("/users/:userId", userContoller.deletSingleUser);
router.put("/users/:userId", userContoller.updateSingleUser);
router.put("/users/:userId/orders", userContoller.createUserOrders);
router.get("/users/:userId/orders", userContoller.getOrdersSingleUser);
router.get(
  "/users/:userId/orders/total-price",
  userContoller.getTotalPriceSingleUserOrder
);

export const userRoutes = router;
