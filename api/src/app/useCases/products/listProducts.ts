import { Request, Response } from "express";

import { Product } from "../../models/Product";

export async function listProductsController(req: Request, res: Response) {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
