const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categoriasControllers');
const { validarCampos } = require('../middlewares/validaciones');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdminRol } = require('../middlewares/validar-roles');
const router = Router();

router.get('/categorias', obtenerCategorias);

router.get('/categorias/:id', [
    check("id", "no es un ID valido").isMongoId(),
    validarCampos
], obtenerCategoria);

router.post('/categorias', [
    validarJWT,
    esAdminRol,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos
], crearCategoria);

router.put('/categorias/:id', [
    validarJWT,
    esAdminRol,
    check("id", " No es un ID valido").isMongoId(),
    validarCampos
], actualizarCategoria);

router.delete('/categorias/:id', [
    validarJWT,
    esAdminRol,
    check("id", " No es un ID valido").isMongoId(),
    validarCampos
], borrarCategoria);

module.exports = router;