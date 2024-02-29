import { Router } from "express";
import { check } from "express-validator";
import { usuariosPost } from "./user.controller.js";
import { existenteEmail, existenteNombreUsuario } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
  "/",
  [
    check("nombreUsuario", "El nombre es obligatorio").not().isEmpty(),
    check("nombreUsuario").custom(existenteNombreUsuario),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({min: 6}),
    check("correo", "Este no es un correo válido").isEmail(),
    check("correo").custom(existenteEmail),
    validarCampos,
  ],usuariosPost);

export default router;