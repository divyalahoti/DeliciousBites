import expenseModel from "../models/expenseModel.js";

// UPDATE EXPENSE
export const updateExpense = async (req, res) => {
  try {
    const updated = await expenseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, expense: updated });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};