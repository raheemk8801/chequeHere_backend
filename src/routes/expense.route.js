import express from "express";
import Expense from "../models/expense.model.js";
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../controllers/crud.controller.js";

const router = express.Router();
router.post("/", createOne(Expense));
router.get("/", getAll(Expense, "supplier"));
router.get("/:id", getOne(Expense, "supplier"));
router.put("/:id", updateOne(Expense));
router.delete("/:id", deleteOne(Expense));

export default router;