import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: { type: String, required: true },

//   items: [
//     {
//       productId: String,
//       quantity: Number
//     }
//   ],

//   amount: Number,
//   paymentMethod: String,
//   status: { type: String, default: "Placed" },

// });



const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Order Placed" },
  paymentMethod: { type: String, default: "COD" },
  payment: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;

