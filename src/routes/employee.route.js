import express from "express";
import Employee from "../models/employee.model.js";
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../controllers/crud.controller.js";

const router = express.Router();
router.post("/", createOne(Employee));
router.get("/", getAll(Employee));
router.get("/:id", getOne(Employee));
router.put("/:id", updateOne(Employee));
router.delete("/:id", deleteOne(Employee));

export default router;