import express from "express";
import Sales from "../models/sales.model.js";
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../controllers/crud.controller.js";

const router = express.Router();

router.post("/", createOne(Sales));
router.get("/", getAll(Sales));
router.get("/:id", getOne(Sales));
router.put("/:id", updateOne(Sales));
router.delete("/:id", deleteOne(Sales));

export default router;
