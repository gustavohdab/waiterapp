import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function createCategoriesController(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    if (!icon || !name) {
      return res.status(400).json("Missing required fields");
    }

    const categoryAlreadyExists = await Category.findOne({ name });

    if (categoryAlreadyExists) {
      return res.status(400).json("Category already exists");
    }

    const category = await Category.create({ icon, name });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
