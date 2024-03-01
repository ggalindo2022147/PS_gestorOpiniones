import { Router } from "express";
import { check } from "express-validator";
import { publicationsPost, publicationsGet } from "./publication.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("titulo", "The title is required").not().isEmpty(),
        check("categoria", "The category is required").not().isEmpty(),
        check("contenido", "The content is required").not().isEmpty(),
        validarCampos,
    ], publicationsPost);

router.get("/", validarJWT, publicationsGet);

export default router;