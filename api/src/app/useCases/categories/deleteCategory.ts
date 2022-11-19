import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function deleteCategoriesController(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    // Checking if the category exists.
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json("Category not found");
    }

    // Checking if the category is duplicated.
    const duplicatedCategory = await Category.findOne({
      name: category.name,
      _id: { $ne: category._id },
    });

    if (duplicatedCategory) {
      await Category.findByIdAndDelete(categoryId);
      return res.sendStatus(204);
    } else {
      !duplicatedCategory;
      return res.status(400).json("Category is not duplicated");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
