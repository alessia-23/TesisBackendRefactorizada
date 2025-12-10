import jwt from "jsonwebtoken"
import Usuario from "../model/Usuario.js"
import Cuidador from "../model/Cuidador.js"

/**
 * Crear token JWT
 * @param {string} id - ID del usuario
 * @param {string} rol - Rol del usuario
 * @returns {string} token - JWT
 */
const crearTokenJWT = (id, rol, email) => {
    return jwt.sign({ id, rol, email }, process.env.JWT_SECRET, { expiresIn: "1d" })
}




const verificarTokenJWT = async (req, res, next) => {

    const { authorization } = req.headers
    if (!authorization) return res.status(401).json({ msg: "Acceso denegado: token no proporcionado" })
    try {
        const token = authorization.split(" ")[1]
        const { id, rol } = jwt.verify(token, process.env.JWT_SECRET)
        const UsuarioBDD = await Usuario.findById(id).lean().select("-password")
        switch (rol) {
            case "Usuario":
                if (!UsuarioBDD) return res.status(401).json({ msg: "Usuario no encontrado" })
                req.UsuarioHeader = UsuarioBDD
                next()
                break;
            case "Dueño":
                if (!UsuarioBDD) return res.status(401).json({ msg: "Usuario no encontrado" })
                req.UsuarioHeader = UsuarioBDD
                next()
                break;
            case "Cuidador":
                if (!UsuarioBDD) return res.status(401).json({ msg: "Usuario no encontrado" })
                req.UsuarioHeader = UsuarioBDD
                next()
                break;

            default:
                return res.status(401).json({ msg: `Rol no definido` })
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({ msg: `Token inválido o expirado - ${error}` })
    }
}


export {
    crearTokenJWT,
    verificarTokenJWT
}

