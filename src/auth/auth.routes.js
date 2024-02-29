import { Router } from "express";
import { check } from "express-validator";
import { loginUser } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/login",
    [
        check('correo', 'This is not a valid email').isEmail(),
        check('password', 'The password is mandatory').not().isEmpty(),
        validarCampos,
    ], loginUser);

    router.post(
    "/loginN",
    [
        check('nombreUsuario', 'This is not a valid username').not().isEmpty(),
        check('password', 'The password is mandatory').not().isEmpty(),
        validarCampos,
    ], loginUser);

export default router;