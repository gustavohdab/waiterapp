import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function createProductsController(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
