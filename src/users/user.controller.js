import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const usuariosPost = async (req, res) => {

    const { nombreUsuario, correo, password } = req.body;
    const usuario = new User({ nombreUsuario, correo, password });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const usuariosPut = async (req, res) => {
    const { correo, password } = req.body;
    const { id } = req.params;
    const user = req.usuario.nombreUsuario;

    const usuario = await User.findById(id);

    if (usuario.nombreUsuario !== user) {
        return res.status(401).json({
            msg: 'You do not have permission to edit this user'
        });
    } else {
        try {
            const usuario = await User.findById(id);

            if (!usuario) {
                return res.status(404).json({
                    msg: 'Usuario no encontrado'
                });
            }

            if (password) {
                const salt = bcryptjs.genSaltSync();
                usuario.password = bcryptjs.hashSync(password, salt);

            }

            usuario.correo = correo;

            await usuario.save();

            res.status(200).json({
                usuario
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error en el servidor'
            });
        }
    }
}