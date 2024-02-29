import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const usuariosPost = async (req, res) => {

    const {nombreUsuario, correo, password} = req.body;
    const usuario = new User( {nombreUsuario, correo, password} );

    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password, salt);

    
    await usuario.save();

    res.status(200).json({
        usuario
    });
}
