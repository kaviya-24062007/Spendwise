const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user });
  res.json(expenses);
};

exports.updateExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense)
    return res.status(404).json({ message: "Expense not found" });

  if (expense.user.toString() !== req.user)
    return res.status(401).json({ message: "Not authorized" });

  const updated = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

exports.deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense)
    return res.status(404).json({ message: "Expense not found" });

  if (expense.user.toString() !== req.user)
    return res.status(401).json({ message: "Not authorized" });

  await expense.deleteOne();

  res.json({ message: "Expense deleted" });
};