import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';

export const loginUser = async (req, res) => {
    const { nombreUsuario, correo, password } = req.body;

    try {
        let user = await User.findOne({ correo });

        if (!user) {
            user = await User.findOne({ nombreUsuario });
            if (!user) {
                return res.status(400).json({
                    msg: "Incorrect credentials"
                })
            }
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: "The user does not exist in the database"
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect"
            }); 
        }

        const token = await generarJWT( user.id );

        return res.status(200).json({
            msg: "Login OK!!!",
            user,
            token
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Contact administrator"
        })
    }
}