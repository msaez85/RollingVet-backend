const { Router } = require('express');
const { check } = require('express-validator');
const { productosGet, productosPost, productosDelete, productosUpdate } = require('../controllers/productosControllers');
const { validarCampos } = require('../middlewares/validaciones');
const { productoExite } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdminRol } = require('../middlewares/validar-roles');
const router = Router();

router.get('/productos', productosGet);

router.put('/productos/:id', [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(productoExite),
    validarCampos
], productosUpdate);

router.delete('/productos/:id', [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(productoExite),
    validarCampos
], productosDelete);

router.post('/productos', [
    validarJWT,
    esAdminRol,
    check("name", "el nombre del producto es obligatorio").notEmpty(),
    validarCampos
], productosPost);

module.exports = router;