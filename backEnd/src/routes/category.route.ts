import express from "express";
import { getAllCategories } from "../controllers/category.controller";

export const categoryRoutes = express.Router();

categoryRoutes
  .get("/", getAllCategories);
