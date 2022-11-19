import { Request, Response } from "express";

import { Order } from "../../models/Order";

export async function listOrdersController(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 }) // Sort by createdAt in ascending order
      .populate("products.product");

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
