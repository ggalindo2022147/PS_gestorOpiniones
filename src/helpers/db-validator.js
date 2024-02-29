import User from '../users/user.model.js';

export const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({correo});
    if (existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existenteNombreUsuario = async (nombreUsuario = '') => {
    const existeNombreUsuario = await User.findOne({ nombreUsuario });
    if (existeNombreUsuario) {
        throw new Error(`El nombre de usuario ${nombreUsuario} ya fue registrado`);
    }
}