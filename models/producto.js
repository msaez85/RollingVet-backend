const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"]
    },
    detail: {
        type: String,
        required: [true, "El detalle del producto es obligatorio"]
    },
    price: {
        type: String,
        required: [true, "El precio del producto es obligatorio"]
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
})

ProductoSchema.methods.toJSON = function () {
    const { __v, _id, ...producto } = this.toObject();
    producto.pid = _id
    return producto;
}
module.exports = model("Producto", ProductoSchema)