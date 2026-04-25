//backend/routes/orderRoute.js

import express from "express";
import { placeOrder, cancelOrder, allOrders, updateStatus, userOrders, getLastOrder } from "../controllers/orderController.js";
import adminAuth from '../middleware/adminAuth.js';
import authUser from './../middleware/auth.js';


const orderRouter = express.Router();

// Admin features
// orderRouter.post('/list', adminAuth, allOrders);
// orderRouter.post('/status', adminAuth, updateStatus)

orderRouter.post('/list', allOrders);
orderRouter.post('/status', updateStatus);

// orderRouter.post("/placeOrder",authUser, placeOrder);
orderRouter.post("/placeOrder", authUser, placeOrder);
orderRouter.put("/:id/cancel", authUser, cancelOrder);
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.post("/last-order", authUser, getLastOrder);

export default orderRouter;