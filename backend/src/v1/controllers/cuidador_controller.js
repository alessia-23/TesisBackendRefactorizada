import Cuidador from "../../core/model/Cuidador.js";
import { sendMailToCuidador } from "../../core/helpers/mail/sendMail.js";
import { subirBase64Cloudinary, subirImagenCloudinary } from "../../core/helpers/cloudinary/uploadCloudinary.js";

const registrarCuidador = async (req, res) => {
    try {
        const { email } = req.body;

        if (Object.values(req.body).includes(""))
            return res.status(400).json({ msg: "Debes llenar todos los campos" });

        const emailExistente = await Cuidador.findOne({ email });
        if (emailExistente) return res.status(400).json({ msg: "El email ya se encuentra registrado" });

        const password = Math.random().toString(36).toUpperCase().slice(2, 6);
        const passwordGenerada = "VET" + password;

        const nuevoCuidador = new Cuidador({
            ...req.body,
        });

        const tokenGenerado = nuevoCuidador.createToken();
        nuevoCuidador.password = await nuevoCuidador.encryptPassword(passwordGenerada);

        if (req.files?.imagen) {
            const { secure_url, public_id } = await subirImagenCloudinary(req.files.imagen.tempFilePath);
            nuevoCuidador.avatar = secure_url;
            nuevoCuidador.avatarID = public_id;
        }

        if (req.body?.avatarIA) {
            const secure_url = await subirBase64Cloudinary(req.body.avatarIA);
            nuevoCuidador.avatarIA = secure_url;
        }

        await nuevoCuidador.save();
        await sendMailToCuidador(email, passwordGenerada, tokenGenerado);

        return res.status(201).json({ msg: "Cuidador registrado con éxito. Revisa tu correo." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: `❌ Error en el servidor - ${error}` });
    }
};

export {
    registrarCuidador
};
