const { request, response } = require('express');
const Turno = require('../models/turno');


const turnosGet = async (req = request, res = response) => {
    try {
        const { desde, limite } = req.query;
        const query = { estado: true };
        const turnos = await Turno.find(query).skip(desde).limit(limite)
        res.status(200).json({ turnos });
    } catch (error) {
        res.status(404).json({
            msg: 'Error al cargar los turnos',
            status: 404,
        });
    }
};

const turnosDiariosGet = async (req = request, res = response) => {
    try {
        const { desde, limite } = req.query;
        const { fecha, vet } = req.params;
        const query = { date: fecha, estado: true, vet: vet };
        const turnos = await Turno.find(query).skip(desde).limit(limite)
        res.status(200).json({ turnos });
    } catch (error) {
        res.status(404).json({
            msg: 'Error al cargar los turnos',
            status: 404,
        });
    }
};

const turnosPost = async (req = request, res = response) => {
    try {
        const datos = req.body;
        const { ownerName, email, name, vet, date, time, detail } = datos;
        const turno = new Turno({ ownerName, email, name, vet, date, time, detail })
        //guardar en BD
        await turno.save();
        res.status(200).json({
            msg: 'Turno creado correctamente',
            status: 200
        });
    } catch (error) {
        res.status(404).json({
            msg: 'Error al crear al turno',
            status: 404
        });
    }
};

const turnosDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const turno = await Turno.findById(id);
        if (!turno.estado) {
            return res.status(404).json({
                msg: 'El turno ya estaba inactivo',
                status: 404
            })
        }
        const turnoinactivado = await Turno.findByIdAndUpdate(id, { estado: false }, { new: true })
        if (turnoinactivado) {
            res.status(200).json({
                msg: 'Turno borrado correctamente',
                status: 200
            })
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Error al borrar el turno',
            status: 400
        });
    }
};

const turnosUpdate = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { ...resto } = req.body;
        const turno = await Turno.findByIdAndUpdate(id, resto, { new: true });
        if (turno) {
            res.status(200).json({
                msg: 'Turno actualizado correctamente',
                status: 200
            })
        }
    } catch (error) {
        res.status(404).json({
            msg: "Error al actualizar al turno",
            status: 404
        });
    }
};

module.exports = { turnosGet, turnosDiariosGet, turnosPost, turnosDelete, turnosUpdate };
