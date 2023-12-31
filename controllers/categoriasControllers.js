const { request, response } = require('express');
const Categoria = require('../models/categoria');

const obtenerCategorias = async (req = request, res = response) => {
    const { desde = 0, limite = 5 } = req.query;
    const query = { estado: true };
    const [categorias, total] = await Promise.all([
        Categoria.find(query).skip(desde).limit(limite).populate("usuario", "correo"),
        Categoria.countDocuments(query)
    ])
    res.json({
        categorias,
        total
    })
}

const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate("usuario", "nombre correo");
    res.json({
        categoria
    })
}

const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre })
    if (categoriaDB) {
        res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json({
        msg: "categoria creada exitosamente"
    })
}

const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();
    const usuario = req.usuario._id;
    const data = {
        nombre,
        usuario
    }
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});
    res.status(200).json({
        msg:"Categoria actualizada",
        status: 200
    })
}

const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoriaBarrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json({
        msg:'Categoria inactivada',
        status: 200
    })
}

module.exports = { obtenerCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, borrarCategoria };
