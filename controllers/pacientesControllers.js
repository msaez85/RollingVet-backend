const { request, response } = require('express');
const Paciente = require('../models/paciente');


const pacientesGet = async (req = request, res = response) => {
    try {
        const { desde, limite } = req.query;
        const query = { estado: true };
        const pacientes = await Paciente.find(query).skip(desde).limit(limite)
        res.status(200).json(pacientes);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Error al cargar los pacientes",
        });
    }
};

const pacientesPost = async (req = request, res = response) => {
    try {
        const datos = req.body;
        const { ownerName, email, phone, name, race, species } = datos;
        const paciente = new Paciente({ ownerName, email, phone, name, race, species })
        //guardar en BD
        await paciente.save();
        res.status(200).json({
            ok: true,
            mensaje: 'Paciente creado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Error al crear al paciente",
        });
    }
};

const pacientesDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findById(id);
        if (!paciente.estado) {
            return res.status(404).json({
                msg: 'El paciente ya estaba inactivo'
            })
        }
        const pacienteinactivado = await Paciente.findByIdAndUpdate(id, { estado: false }, { new: true })
        if (pacienteinactivado) {
            res.status(200).json({
                msg: 'Paciente inactivado correctamente',
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ ok: false, message: 'Error al borrar el paciente' });
    }
};

const pacientesUpdate = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { ...resto } = req.body;
        const paciente = await Paciente.findByIdAndUpdate(id, resto, { new: true });
        if (paciente) {
            res.status(200).json({
                mensaje: 'Paciente actualizado correctamente'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Error al actualizar al paciente",
        });
    }
};

module.exports = { pacientesGet, pacientesPost, pacientesDelete, pacientesUpdate };
