const { Schema, model } = require('mongoose');

const TurnoSchema = Schema({
    ownerName: {
        type: String,
        required: [true, "El nombre del dueño es obligatorio"]
    },
    name: {
        type: String,
        required: [true, "El nombre de la mascota es obligatorio"],
        unique: true
    },
    vet: {
        type: String,
        required: [true, "El veteriinario es obligatorio"]
    },
    date: {
        type: String,
        required: [true, "La fecha es obligatoria"]
    },
    time: {
        type: String,
        required: [true, "La hora es obligatoria"]
    },
    detail: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
})

TurnoSchema.methods.toJSON = function () {
    const { __v, _id, ...turno } = this.toObject();
    turno.uid = _id
    return turno;
}
module.exports = model("Turno", TurnoSchema)