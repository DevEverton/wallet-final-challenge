const express = require("express");
const transactionRouter = express.Router();
const model = require("../models/TransactionModel.js");

//Get transactions by period
transactionRouter.get("/", async (req, res) => {
  try {
    const period = req.query.period;
    if (!period) {
      res.send(errorMessage);
    } else {
      const transactions = await model.find({ yearMonth: period });
      res.send(transactions);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//Add transaction
transactionRouter.post("/", async (req, res) => {
  try {
    const { description, value, category, year, month, day, type } = req.body;
    const newTransaction = await model.create({
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth: `${year}-${month}`,
      yearMonthDay: `${year}-${month}-${day}`,
      type,
    });
    res.send(newTransaction);
  } catch (err) {
    res.status(400).send(err);
  }
});

const errorMessage = {
  error:
    'É necessário informar o parametro "period", cujo valor deve estar no formato yyyy-mm',
};

module.exports = transactionRouter;
