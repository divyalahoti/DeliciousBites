// PLACE ORDER
import orderModel from "../models/orderModel.js";

// Placing orders using COD Method
export const placeOrder = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const { items, amount, address, userId } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    // await orderModel.findByIdAndUpdate(userId, { cartData: {} })   
    res.json({ success: true, message: "Order Placed" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// CANCEL ORDER
export const cancelOrder = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL ORDERS (ADMIN)
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ USER ORDERS
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({
      userId: String(userId)
    });

    res.json({ success: true, orders });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// ✅ UPDATE STATUS (ADMIN)
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getLastOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const lastOrder = await orderModel
      .findOne({ userId: String(userId) })
      .sort({ date: -1 });

    if (!lastOrder) {
      return res.json({ success: false, message: "No orders found" });
    }

    res.json({ success: true, order: lastOrder });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};