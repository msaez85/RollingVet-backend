const Rol = require('../models/Rol');
const Usuario = require('../models/usuario');
const Paciente = require('../models/paciente');
const Turno = require('../models/turno');
const Producto = require('../models/producto');

const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en la base de datos`)
    }
}

const emailExiste = async (email) => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ${email} ya existe en la base de datos`)
    }
}

const emailRegistrado = async (email) => {
    const existeEmail = await Usuario.findOne({ email });
    if (!existeEmail) {
        throw new Error(`El correo ${email} no existe en la base de datos`)
    }
}

const usuarioExite = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El usuario con ID ${id} no existe en la base de datos`)
    }
}

const pacienteExite = async (id) => {
    const existePaciente = await Paciente.findById(id);
    if(!existePaciente){
        throw new Error(`El paciente con ID ${id} no existe en la base de datos`)
    }
}

const turnoExite = async (id) => {
    const existeTurno = await Turno.findById(id);
    if(!existeTurno){
        throw new Error(`El turno con ID ${id} no existe en la base de datos`)
    }
}

const productoExite = async (id) => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El producto con ID ${id} no existe en la base de datos`)
    }
}

module.exports = { emailExiste, esRolValido, usuarioExite, pacienteExite, turnoExite, emailRegistrado, productoExite };