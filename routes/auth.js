const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaciones');
const { login } = require('../controllers/login');
const router = Router();

router.post('/auth/login', [
    check("correo", "El correo no es valido").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validarCampos
], login);

module.exports = router;