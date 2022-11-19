import path from "node:path";

import { Router } from "express";
import multer from "multer";

import { createCategoriesController } from "./app/useCases/categories/createCategory";
import { deleteCategoriesController } from "./app/useCases/categories/deleteCategory";
import { listCategoriesController } from "./app/useCases/categories/listCategories";
import { listProductsByCategoryController } from "./app/useCases/categories/listProductsByCategory";
import { cancelOrderController } from "./app/useCases/orders/cancelOrder";
import { changeOrderStatusController } from "./app/useCases/orders/changeOrderStatus";
import { createOrderController } from "./app/useCases/orders/createOrder";
import { listOrdersController } from "./app/useCases/orders/listOrders";
import { createProductsController } from "./app/useCases/products/createProducts";
import { listProductsController } from "./app/useCases/products/listProducts";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get("/categories", listCategoriesController);

// Create category
router.post("/categories", createCategoriesController);

// Delete category
router.delete("/categories/:categoryId", deleteCategoriesController);

// List products
router.get("/products", listProductsController);

// Create product
router.post("/products", upload.single("image"), createProductsController);

// Get product by category
router.get(
  "/categories/:categoryId/products",
  listProductsByCategoryController
);

// List orders
router.get("/orders", listOrdersController);

// Create order
router.post("/orders", createOrderController);

// Change order status
router.patch("/orders/:orderId", changeOrderStatusController);

// Delete/cancel order
router.delete("/orders/:orderId", cancelOrderController);
