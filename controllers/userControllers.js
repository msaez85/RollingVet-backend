const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {
    try {
        const { desde, limite } = req.query;
        const query = { estado: true };
        const [usuarios, total] = await Promise.all([
            Usuario.find(query).skip(desde).limit(limite),
            Usuario.countDocuments(query)
        ])
        res.status(200).json({ usuarios, total });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Error al cargar los usuarios",
        });
    }
};

const usuariosPost = async (req = request, res = response) => {
    try {
        const datos = req.body;
        const { nombre, correo, password, rol } = datos;
        const usuario = new Usuario({ nombre, correo, password, rol })
        //encriptamos password
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);
        usuario.password = hash;
        //guardar en BD
        await usuario.save()
        res.status(200).json({
            message: "Usuario generado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Error al generar el usuario",
        });
    }
};

const usuariosDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario.estado) {
            return res
                .status(404)
                .json({ ok: true, message: "El usuario ya estaba inactivo" });
        }
        const usuarioinactivado = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true })
        if (usuarioinactivado) {
            res.status(200).json({ mensaje: "Usuario borrado correctamente" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ ok: false, message: "Error al borrar el usuario" });
    }
};

const usuariosUpdate = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { password, correo, ...resto } = req.body;
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            resto.password = bcrypt.hashSync(password, salt);
        }
        const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
        if (usuario) {
            res.status(200).json({
                message: "Usuario actualizado correctamente",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Error al actualizar el usuario",
        });
    }
};

module.exports = { usuariosGet, usuariosPost, usuariosDelete, usuariosUpdate };