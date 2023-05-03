import { Schema, model } from "mongoose";
export const productsCollectionName = 'products'

const productosSchema = new Schema({
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
} );

export const ProductsModel = model(productsCollectionName, productosSchema);
