import Order from "../models/orderModel.js";
import Booking from "../models/bookingModel.js";
import Expense from "../models/expenseModel.js";

export const getReport = async (req, res) => {
    try {
        const { date } = req.query;

        let orderFilter = {};
        let bookingFilter = {};
        let expenseFilter = {};

        // 📅 If date is provided → filter data
        if (date) {
            const start = new Date(date);
            const end = new Date(date);

            end.setHours(23, 59, 59, 999);

            orderFilter = { createdAt: { $gte: start, $lte: end } };
            bookingFilter = { createdAt: { $gte: start, $lte: end } };
            expenseFilter = { createdAt: { $gte: start, $lte: end } };
        }

        // 🔍 Fetch filtered data
        const orders = await Order.find(orderFilter);
        const bookings = await Booking.find(bookingFilter);
        const expenses = await Expense.find(expenseFilter);

        // 📊 Calculations
        const totalOrders = orders.length;

        const totalRevenue = orders.reduce(
            (sum, o) => sum + (o.amount || 0),
            0
        );

        const totalExpense = expenses.reduce(
            (sum, e) => sum + (e.amount || 0),
            0
        );

        const profit = totalRevenue - totalExpense;

        // ✅ Response
        res.json({
            success: true,
            data: {
                totalOrders,
                totalRevenue,
                totalBookings: bookings.length,
                totalExpense,
                profit,
            },
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }
};