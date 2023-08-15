const { Schema, model } = require('mongoose');

const PacienteSchema = Schema({
    ownerName: {
        type: String,
        required: [true, "El nombre del dueño es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"]
    },
    phone: {
        type: String,
        required: [true, "El telefono es obligatorio"]
    },
    name: {
        type: String,
        required: [true, "El nombre de la mascota es obligatorio"]
    },
    race: {
        type: String
    },
    species: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
})

PacienteSchema.methods.toJSON = function () {
    const { __v, _id, ...paciente } = this.toObject();
    paciente.pid = _id
    return paciente;
}
module.exports = model("Paciente", PacienteSchema)