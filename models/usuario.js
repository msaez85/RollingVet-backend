const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del usuario es obligatorio desde models"]
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio desde models"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio desde models"]
    },
    rol: {
        type: String,
        required: true,
        enum: ["USER", "ADMIN"]
    },
    estado: {
        type: Boolean,
        default: true
    }
})

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id
    return usuario;
}
module.exports = model("Usuario", UsuarioSchema)