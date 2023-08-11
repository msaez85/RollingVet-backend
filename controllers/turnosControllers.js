const { request, response } = require('express');
const Turno = require('../models/turno');


const turnosGet = async (req = request, res = response) => {
    try {
        const { desde, limite } = req.query;
        const query = { estado: true };
        const turnos = await Turno.find(query).skip(desde).limit(limite)
        res.status(200).json(turnos);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Error al cargar los turnos",
        });
    }
};

const turnosPost = async (req = request, res = response) => {
    try {
        const datos = req.body;
        const { ownerName, name, vet, date, time, detail } = datos;
        const turno = new Turno({ ownerName, name, vet, date, time, detail })
        //guardar en BD
        await turno.save();
        res.status(200).json({
            ok: true,
            mensaje: 'Turno creado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Error al crear al turno",
        });
    }
};

const turnosDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const turno = await Turno.findById(id);
        if (!turno.estado) {
            return res.status(404).json({
                msg: 'El turno ya estaba inactivo'
            })
        }
        const turnoinactivado = await Turno.findByIdAndUpdate(id, { estado: false }, { new: true })
        if (turnoinactivado) {
            res.status(200).json({
                msg: 'Turno borrado correctamente',
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ ok: false, message: 'Error al borrar el turno' });
    }
};

const turnosUpdate = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { ...resto } = req.body;
        const turno = await Turno.findByIdAndUpdate(id, resto, { new: true });
        if (turno) {
            res.status(200).json({
                mensaje: 'Turno actualizado correctamente'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Error al actualizar al turno",
        });
    }
};

module.exports = { turnosGet, turnosPost, turnosDelete, turnosUpdate };
