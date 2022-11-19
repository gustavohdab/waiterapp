import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function cancelOrderController(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
