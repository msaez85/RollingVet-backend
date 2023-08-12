const Rol = require('../models/Rol');
const Usuario = require('../models/usuario');
const Paciente = require('../models/paciente');
const Turno = require('../models/turno');

const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en la base de datos`)
    }
}

const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la base de datos`)
    }
}

const emailRegistrado = async (correo) => {
    const existeEmail = await Usuario.findOne({ correo });
    if (!existeEmail) {
        throw new Error(`El correo ${correo} no existe en la base de datos`)
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

module.exports = { emailExiste, esRolValido, usuarioExite, pacienteExite, turnoExite, emailRegistrado };