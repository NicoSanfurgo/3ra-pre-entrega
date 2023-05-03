import { Schema, model } from "mongoose";
import { productsCollectionName } from "./productos";

const CarritoSchema = new Schema({
  product: {
    type: Schema.ObjectId,
    ref: productsCollectionName,
    default: function () {
      return this._id;
    },
  },
});

export const CartModel = model("carts", CarritoSchema);
