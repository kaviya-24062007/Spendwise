const Expense = require("../models/Expense");
const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  const expenses = await Expense.find({ user: req.user });
  const user = await User.findById(req.user);

  let totalExpense = 0;

  expenses.forEach((exp) => {
    totalExpense += exp.amount;
  });

  const savings = user.monthlyIncome - totalExpense;

  res.json({
    monthlyIncome: user.monthlyIncome,
    totalExpense,
    savings,
    warning:
      savings < 0
        ? "You have exceeded your monthly income!"
        : "You are within your budget.",
  });
};