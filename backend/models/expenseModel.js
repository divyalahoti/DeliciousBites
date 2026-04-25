import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g. Light Bill
  amount: { type: Number, required: true },
  category: { type: String, required: true }, // Grocery, Utility, etc.
  note: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("expense", expenseSchema);