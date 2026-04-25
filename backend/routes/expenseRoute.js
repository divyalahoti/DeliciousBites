import express from "express";
import Expense from "../models/expenseModel.js";
import { updateExpense } from "../controllers/expenseController.js";

const router = express.Router();

// ADD EXPENSE
router.post("/add", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

// GET ALL EXPENSES
router.get("/list", async (req, res) => {
  const expenses = await Expense.find();
  res.json({ success: true, expenses });
});

// DELETE EXPENSE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

router.put("/update/:id", updateExpense);

export default router;