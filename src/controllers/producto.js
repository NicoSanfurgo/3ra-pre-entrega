import { CartModel } from "../models/carritos";
import { ProductsModel } from "../models/productos";
import { UserModel } from "../models/user";
import { normalize, schema } from "normalizr";

export const checkBodyProduct = async (req, res, next) => {
  const { name, stock, price } = req.body;

  if (!name || !stock || !price)
    return res.status(400).json({
      msg: "missing Body fields",
    });
  next();
};

export const getAllProducts = async (req, res, email) => {
  try {
    const query = {};
    const user = await UserModel.findOne({ email });
    const items = await ProductsModel.find(query);

    res.json({
      msg: `Hola ${req.user.nombre}, agrega tus productos al carrito`,
      data: items,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ProductsModel.findById(id);

    if (!item)
      return res.status(404).json({
        msgs: "Product not found!",
      });
    res.json({
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, stock, price } = req.body;

    if (!name || !stock || !price)
      return res.status(400).json({
        msg: "Datos invalidos",
      });

    const idCart = CartModel.insertMany({});
    const newProduct = await ProductsModel.findByIdAndUpdate(
      idCart,
      { name, stock, price },
      { new: true }
    );

    res.json({
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stock, price, carritoId } = req.body;

    let item = await ProductsModel.findById(id);

    if (!item)
      return res.status(404).json({
        msgs: "Product not found!",
      });

    const productUpdated = await ProductsModel.findByIdAndUpdate(
      id,
      { name, stock, price, carritoId },
      { new: true }
    );

    res.json({
      msg: "Product updated",
      data: productUpdated,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductsModel.findByIdAndDelete(id);
    res.json({
      msg: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};
