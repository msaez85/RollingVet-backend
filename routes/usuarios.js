const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosUpdate } = require('../controllers/userControllers');
const { validarCampos } = require('../middlewares/validaciones');
const { esRolValido, emailExiste, usuarioExite } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdminRol } = require('../middlewares/validar-roles');
const router = Router();

router.get('/usuarios', validarJWT, usuariosGet);

router.put('/usuarios/:id', [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido").isMongoId(),
    check("rol").custom(esRolValido),
    check("id").custom(usuarioExite),
    validarCampos
], usuariosUpdate);

router.delete('/usuarios/:id', [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(usuarioExite),
    validarCampos
], usuariosDelete);

router.post('/usuarios', [
    check("nombre", "el nombre es obligatorio desde express-validator").notEmpty(),
    check("correo").custom(emailExiste),
    check("password", "la contraseña debe tener al menos 6 caracteres desde express-validator").isLength({ min: 6 }),
    check("rol").custom(esRolValido),
    validarCampos
], usuariosPost);

module.exports = router;