const { Router } = require('express');
const { check } = require('express-validator');
const { pacientesGet, pacientesPost, pacientesDelete, pacientesUpdate } = require('../controllers/pacientesControllers');
const { validarCampos } = require('../middlewares/validaciones');
const { emailExiste, usuarioExite, pacienteExite } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdminRol } = require('../middlewares/validar-roles');
const router = Router();

router.get('/pacientes',[
    validarJWT,
    esAdminRol,
    validarCampos
], pacientesGet);

router.put('/pacientes/:id', [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(pacienteExite),
    validarCampos
], pacientesUpdate);

router.delete('/pacientes/:id', [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(usuarioExite),
    validarCampos
], pacientesDelete);

router.post('/pacientes', [
    validarJWT,
    esAdminRol,
    check("nombre", "el nombre es obligatorio desde express-validator").notEmpty(),
    check("correo").custom(emailExiste),
    validarCampos
], pacientesPost);

module.exports = router;