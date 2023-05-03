import { CartModel } from '../models/carritos';

export const updateCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const carritoUpdated = await CartModel.findByIdAndUpdate(
            id,
        );
        res.json({
            msg: 'Carrito updated',
            category: carritoUpdated
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    };
};
