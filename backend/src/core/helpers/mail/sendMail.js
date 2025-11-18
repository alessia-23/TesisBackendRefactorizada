import sendMail from "./nodemailer.js"

const sendMailToRegister = (userMail, token) => {
    return sendMail(
        userMail,
        "¡Bienvenido a PetConnect ! 🐶🐱",
        `
            <h1>Confirma tu cuenta</h1>
            <p>Hola 👋, gracias por unirte a <strong>PetConnect </strong>.</p>
            <p>Haz clic en el siguiente enlace para confirmar tu cuenta y empezar a disfrutar de todas las funciones:</p>
            <a href="${process.env.URL_FRONTEND}confirm/${token}">
                Confirmar mi cuenta
            </a>
            <hr>
            <footer>El equipo de PetConnect  te da la más cordial bienvenida 💚.</footer>
        `
    )
}

const sendMailToRecoveryPassword = (userMail, token) => {
    return sendMail(
        userMail,
        "Restablece tu contraseña 🐾",
        `
            <h1>PetConnect  - Recuperación de Contraseña</h1>
            <p>Has solicitado restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
            <a href="${process.env.URL_FRONTEND}recuperarpassword/${token}">
                Restablecer mi contraseña
            </a>
            <hr>
            <footer>Recuerda: tu seguridad es importante para nosotros 💫.</footer>
        `
    )
}

const sendMailChangePasswordConfirm = (userMail) => {
    return sendMail(
        userMail,
        "Tu contraseña ha cambiado🐾",
        `
            <h1>PetConnect  - Tu contraseña ha cambiado</h1>
            <hr>
            <footer>Recuerda: tu seguridad es importante para nosotros 💫.</footer>
        `
    )
}

export {
    sendMailToRegister,
    sendMailToRecoveryPassword,
    sendMailChangePasswordConfirm
}
