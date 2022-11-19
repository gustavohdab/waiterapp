import { model, Schema } from "mongoose";

export const Category = model(
  "Category",
  new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
  })
);
