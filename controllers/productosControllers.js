const { request, response } = require('express');
const Producto = require('../models/producto');


const productosGet = async (req = request, res = response) => {
    try {
        const { desde, limite } = req.query;
        const query = { estado: true };
        const productos = await Producto.find(query).skip(desde).limit(limite)
        res.status(200).json({ productos });
    } catch (error) {
        res.status(404).json({
            msg: 'Error al cargar los productos',
            status: 404
        });
    }
};

const productosPost = async (req = request, res = response) => {
    try {
        const datos = req.body;
        const { name, detail, price, img } = datos;
        const producto = new Producto({ name, detail, price, img })
        //guardar en BD
        await producto.save();
        res.status(200).json({
            msg: 'Producto creado correctamente',
            status: 200
        });
    } catch (error) {
        res.status(404).json({
            msg: 'Error al crear al producto',
            status: 404
        });
    }
};

const productosDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);
        if (!producto.estado) {
            return res.status(404).json({
                msg: 'El producto ya estaba inactivo',
                status: 404
            })
        }
        const productoinactivado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
        if (productoinactivado) {
            res.status(200).json({
                msg: 'Producto inactivado correctamente',
                status: 200
            })
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Error al borrar el producto',
            status: 400
        });
    }
};

const productosUpdate = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { ...resto } = req.body;
        const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });
        if (producto) {
            res.status(200).json({
                msg: 'Producto actualizado correctamente',
                status: 200
            })
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Error al actualizar al producto',
            status: 404
        });
    }
};

module.exports = { productosGet, productosPost, productosDelete, productosUpdate };
