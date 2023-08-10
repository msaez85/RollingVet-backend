const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, "El rol es obligatorio desde models"]
    }
})

module.exports = model("Rol",RolSchema)