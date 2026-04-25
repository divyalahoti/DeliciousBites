import express from "express";
import authUser from "../middleware/auth.js";
import {
  addToCart,
  getCart,
  updateCart,
  clearCart
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/get", authUser, getCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/clear", authUser, clearCart);

export default cartRouter;