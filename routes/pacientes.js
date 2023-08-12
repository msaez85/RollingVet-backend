const { Router } = require('express');
const { check } = require('express-validator');
const { pacientesGet, pacientesPost, pacientesDelete, pacientesUpdate } = require('../controllers/pacientesControllers');
const { validarCampos } = require('../middlewares/validaciones');
const { emailRegistrado, usuarioExite, pacienteExite } = require('../helpers/db-validators');
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
    check("id").custom(pacienteExite),
    validarCampos
], pacientesDelete);

router.post('/pacientes', [
    validarJWT,
    esAdminRol,
    check("name", "el nombre es obligatorio").notEmpty(),
    check("email").custom(emailRegistrado),
    validarCampos
], pacientesPost);

module.exports = router;