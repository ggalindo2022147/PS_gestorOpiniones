import { request, response } from "express";
import Publication from './publication.model.js';

export const publicationsPost = async (req, res) => {  
    const autor = req.usuario.nombreUsuario;
    const {titulo, categoria, contenido} = req.body;

    const publication = new Publication({autor, titulo, categoria, contenido});

    await publication.save();

    res.status(200).json({
        publication
    });
};