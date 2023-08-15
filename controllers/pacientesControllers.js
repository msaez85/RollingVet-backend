const { request, response } = require('express');
const Paciente = require('../models/paciente');


const pacientesGet = async (req = request, res = response) => {
    try {
        const { desde, limite } = req.query;
        const query = { estado: true };
        const pacientes = await Paciente.find(query).skip(desde).limit(limite)
        res.status(200).json({pacientes});
    } catch (error) {
        res.status(404).json({
            msg: 'Error al cargar los pacientes',
            status: 404
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
            msg: 'Paciente creado correctamente',
            status: 200
        });
    } catch (error) {
        res.status(404).json({
            msg: 'Error al crear al paciente',
            status: 404
        });
    }
};

const pacientesDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findById(id);
        if (!paciente.estado) {
            return res.status(404).json({
                msg: 'El paciente ya estaba inactivo',
                status: 404
            })
        }
        const pacienteinactivado = await Paciente.findByIdAndUpdate(id, { estado: false }, { new: true })
        if (pacienteinactivado) {
            res.status(200).json({
                msg: 'Paciente inactivado correctamente',
                status: 200
            })
        }
    } catch (error) {
        res.status(400).json({ 
            msg: 'Error al borrar el paciente',
            status: 400
        });
    }
};

const pacientesUpdate = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { ...resto } = req.body;
        const paciente = await Paciente.findByIdAndUpdate(id, resto, { new: true });
        if (paciente) {
            res.status(200).json({
                msg: 'Paciente actualizado correctamente',
                status: 200
            })
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Error al actualizar al paciente',
            status: 404
        });
    }
};

module.exports = { pacientesGet, pacientesPost, pacientesDelete, pacientesUpdate };
