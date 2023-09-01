const { Router } = require('express');
const { check } = require('express-validator');
const { turnosGet, turnosDiariosGet, turnosPost, turnosDelete, turnosUpdate } = require('../controllers/turnosControllers');
const { validarCampos } = require('../middlewares/validaciones');
const { turnoExite, emailRegistrado } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validarJWT');
const router = Router();

router.get('/turnos',[
    validarJWT,
    validarCampos
], turnosGet);

router.get('/turnos/:fecha/:vet',[
    validarJWT,
    validarCampos
], turnosDiariosGet);

router.put('/turnos/:id', [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(turnoExite),
    validarCampos
], turnosUpdate);

router.delete('/turnos/:id', [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(turnoExite),
    validarCampos
], turnosDelete);

router.post('/turnos', [
    validarJWT,
    check("ownerName", "el nombre del dueño de la mascota es obligatorio").notEmpty(),
    check("email").custom(emailRegistrado),
    validarCampos
], turnosPost);

module.exports = router;