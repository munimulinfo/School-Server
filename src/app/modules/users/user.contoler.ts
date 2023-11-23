import { Request, Response } from "express";
import { userServices } from "./user.service";
import { User } from "./user.interface";
import userValidationSchema from "./user.validation";

//create User From database
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { error } = userValidationSchema.validate(user);
    const result = await userServices.createUserInToDb(user);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User created not successfull",
      error: error,
    });
  }
};
//Get All user from data base
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDb();
    res.status(200).json({
      success: true,
      message: "User fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// get single user by database
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userId);
    const result = await userServices.getSingleUserFromDb(id);
    res.status(200).json({
      success: true,
      message: "Single User fetch Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
// delet single user by data base
const deletSingleUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userId);
    const result = await userServices.deletSingleUserFromDb(id);
    res.status(200).json({
      success: true,
      message: "User Deleted Succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
//update single user from data base
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const updatedData: User = req.body;
    const id = Number(req.params.userId);
    const result = await userServices.updateUserInToDb(updatedData, id);
    res.status(200).json({
      success: true,
      message: "User Data Updated succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
// create orders for single user in data base
const createUserOrders = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.userId);
    const newOrder = req.body;
    const result = await userServices.userOrdersCreateInToDb(newOrder, orderId);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

//get order of single user

const getOrdersSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userServices.getOrdersOfSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const getTotalPriceSingleUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userServices.getAllOrderPriceSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice: result,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Total price calculated not successfully!",
      error: error,
    });
  }
};

export const userContoller = {
  createUser,
  getAllUser,
  getSingleUser,
  deletSingleUser,
  updateSingleUser,
  createUserOrders,
  getOrdersSingleUser,
  getTotalPriceSingleUserOrder,
};
