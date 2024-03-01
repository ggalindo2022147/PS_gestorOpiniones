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

export const publicationsGet = async (req, res) => {
    const publications = await Publication.find({estado: true});
    const total = await Publication.countDocuments({estado: true});
    res.status(200).json({
        msg: "Publications obtained successfully",
        total,
        publications
    });
};

export const publicationsPut = async (req, res) => {
    const {id} = req.params;
    const nombreUsuario = req.usuario.nombreUsuario;

    const publication = await Publication.findById(id);

    if(publication.autor !== nombreUsuario){
        return res.status(401).json({
            msg: "You don't have permission to edit this publication"
        });
    } else {
        const {_id, autor, estado, ...resto} = req.body;
        await Publication.findByIdAndUpdate(id, resto);

        const publicationUpdate = await Publication.findById(id);

        res.status(200).json({
            msg: "Publication updated successfully",
            publicationUpdate
        });
    }

};