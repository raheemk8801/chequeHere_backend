import express from "express";
import Supplier from "../models/supplier.model.js";
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../controllers/crud.controller.js";

const router = express.Router();

router.post("/", createOne(Supplier));
router.get("/", getAll(Supplier));
router.get("/:id", getOne(Supplier));
router.put("/:id", updateOne(Supplier));
router.delete("/:id", deleteOne(Supplier));

export default router;
