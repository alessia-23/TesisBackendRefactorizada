import { sendMailToRegister, sendMailToRecoveryPassword, sendMailChangePasswordConfirm } from "../../core/helpers/mail/sendMail.js";
import Usuario from "../../core/model/Usuario.js";

const registro = async (req, res) => {
    try {
        // PASO 1: Obtener los datos
        const { email, password } = req.body;

        // PASO 2: Validar campos vacíos
        if (Object.values(req.body).includes(""))
            return res
                .status(400)
                .json({ msg: "Lo sentimos, debes llenar todos los campos" });

        // Verificar si el correo ya existe
        const verificarEmailBDD = await Usuario.findOne({ email });
        if (verificarEmailBDD)
            return res
                .status(400)
                .json({ msg: "Lo sentimos, el email ya se encuentra registrado" });

        // PASO 3: Crear nueva instancia
        const newUsuario = new Usuario(req.body);
        newUsuario.password = await newUsuario.encryptPassword(password); // Encriptar password
        const token = newUsuario.createToken(); // Crear token

        // Enviar correo de confirmación
        await sendMailToRegister(email, token);

        await newUsuario.save();
        res
            .status(200)
            .json({ msg: "Revisa tu correo electrónico para confirmar tu cuenta" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` });
    }
};

const confirmarMail = async (req, res) => {
    try {
        const { token } = req.params
        const UsuarioBDD = await Usuario.findOne({ token })

        if (!UsuarioBDD) {
            return res.status(404).json({ msg: "Token inválido o cuenta ya confirmada" })
        }

        UsuarioBDD.token = null
        UsuarioBDD.confirmEmail = true
        UsuarioBDD.status = true
        await UsuarioBDD.save()

        res.status(200).json({ msg: "Cuenta confirmada, ya puedes iniciar sesión" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}
const recuperarPassword = async (req, res) => {

    try {
        const { email } = req.body
        if (!email) return res.status(400).json({ msg: "Debes ingresar un correo electrónico" })
        const UsuarioBDD = await Usuario.findOne({ email })
        if (!UsuarioBDD) return res.status(404).json({ msg: "El usuario no se encuentra registrado" })
        const token = UsuarioBDD.createToken()
        UsuarioBDD.token = token
        await sendMailToRecoveryPassword(email, token)
        await UsuarioBDD.save()
        res.status(200).json({ msg: "Revisa tu correo electrónico para reestablecer tu cuenta" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}

const comprobarTokenPassword = async (req, res) => {
    try {
        const { token } = req.params
        const UsuarioBDD = await Usuario.findOne({ token })
        if (UsuarioBDD?.token !== token) {
            return res.status(404).json({ msg: "Lo sentimos, no se puede validar la cuenta" })
        }

        res.status(200).json({ msg: "Token confirmado, ya puedes crear tu nuevo password" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

const cambiarPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body
        const { token } = req.params

        if (Object.values(req.body).includes("")) {
            return res.status(404).json({ msg: "Debes llenar todos los campos" })
        }
        if (password !== confirmPassword) {
            return res.status(404).json({ msg: "Los passwords no coinciden" })
        }

        const UsuarioBDD = await Usuario.findOne({ token })
        if (!UsuarioBDD) {
            return res.status(404).json({ msg: "No se puede validar la cuenta" })
        }

        // Encriptar nuevo password
        UsuarioBDD.token = null
        UsuarioBDD.password = await UsuarioBDD.encryptPassword(password)
        await UsuarioBDD.save()
        await sendMailChangePasswordConfirm(UsuarioBDD.email)

        res.status(200).json({ msg: "Felicitaciones, ya puedes iniciar sesión con tu nuevo password" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body
        if (Object.values(req.body).includes("")) return res.status(404).json({ msg: "Debes llenar todos los campos" })
        const UsuarioBDD = await Usuario.findOne({ email }).select("-status -__v -token -updatedAt -createdAt")
        if (!UsuarioBDD) return res.status(404).json({ msg: "El usuario no se encuentra registrado" })
        if (!UsuarioBDD.confirmEmail) return res.status(403).json({ msg: "Debes verificar tu cuenta antes de iniciar sesión" })
        const verificarPassword = await UsuarioBDD.matchPassword(password)
        if (!verificarPassword) return res.status(401).json({ msg: "El password no es correcto" })
        const { nombre, apellido, direccion, telefono, _id, rol } = UsuarioBDD
        res.status(200).json({
            rol,
            nombre,
            apellido,
            direccion,
            telefono,
            _id,
            email: UsuarioBDD.email
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}

// EXPORTACIONES
export { registro, confirmarMail, recuperarPassword, comprobarTokenPassword, cambiarPassword, login };
