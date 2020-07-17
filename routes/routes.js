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
  const { description, value, category, year, month, day, type } = req.body;
  try {
    const buildStrings = (year, month, day) => {
      let yearMonth = month < 10 ? `${year}-0${month}` : `${year}-${month}`;
      let yearMonthDay = null;
      if (month < 10 && day < 10) {
        yearMonthDay = `${year}-0${month}-0${day}`;
      } else if (month < 10) {
        yearMonthDay = `${year}-0${month}-${day}`;
      } else if (day < 10) {
        yearMonthDay = `${year}-${month}-0${day}`;
      } else {
        yearMonthDay = `${year}-${month}-${day}`;
      }
      return [yearMonth, yearMonthDay];
    };

    const newTransaction = await model.create({
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth: buildStrings(year, month, day)[0],
      yearMonthDay: buildStrings(year, month, day)[1],
      type,
    });
    res.send(newTransaction);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Edit transaction history
transactionRouter.put("/:id", async (req, res) => {
  const { description, value, category, year, month, day } = req.body;
  const id = req.params.id;
  try {
    const updatedTransaction = await model.findOneAndUpdate(
      { _id: id },
      { description, value, category, year, month, day },
      { new: true }
    );

    res.send(updatedTransaction);
  } catch (err) {
    res.status(400).send(err);
  }
});

const errorMessage = {
  error:
    'É necessário informar o parametro "period", cujo valor deve estar no formato yyyy-mm',
};

module.exports = transactionRouter;
