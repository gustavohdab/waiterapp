import { Request, Response } from "express";

import { Product } from "../../models/Product";

export async function listProductsByCategoryController(
  req: Request,
  res: Response
) {
  try {
    const { categoryId } = req.params;
    const products = await Product.find().where("category").equals(categoryId);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
