import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function changeOrderStatusController(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    /* Checking if the status is valid. */
    if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
      return res.status(400).json("Invalid status");
    }

    /* Updating the order status. */
    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
