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

//Add income at period start
transactionRouter.post("/", async (req, res) => {
  try {
    const period = req.query.period;
    if (!period) {
      res.send(errorMessage);
    } else {
      //   const transactions = await model.find({ yearMonth: period });
      //   res.send(transactions);
      res.end();
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

const errorMessage = {
  error:
    'É necessário informar o parametro "period", cujo valor deve estar no formato yyyy-mm',
};

module.exports = transactionRouter;
