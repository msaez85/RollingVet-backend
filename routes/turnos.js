const { Router } = require('express');
const { check } = require('express-validator');
const { turnosGet, turnosPost, turnosDelete, turnosUpdate } = require('../controllers/turnosControllers');
const { validarCampos } = require('../middlewares/validaciones');
const { emailExiste, usuarioExite, turnoExite } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdminRol } = require('../middlewares/validar-roles');
const router = Router();

router.get('/turnos', turnosGet);

router.put('/turnos/:id', [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(turnoExite),
    validarCampos
], turnosUpdate);

router.delete('/turnos/:id', [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(usuarioExite),
    validarCampos
], turnosDelete);

router.post('/turnos', [
    validarJWT,
    esAdminRol,
    check("nombre", "el nombre es obligatorio desde express-validator").notEmpty(),
    check("correo").custom(emailExiste),
    validarCampos
], turnosPost);

module.exports = router;