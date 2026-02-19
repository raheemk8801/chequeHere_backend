import express from "express";
import PendingInv from "../models/pendinginv.model.js";
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../controllers/crud.controller.js";

const router = express.Router();
router.post("/", createOne(PendingInv));
router.get("/", getAll(PendingInv, "supplier"));
router.get("/:id", getOne(PendingInv, "supplier"));
router.put("/:id", updateOne(PendingInv));
router.delete("/:id", deleteOne(PendingInv));

export default router;