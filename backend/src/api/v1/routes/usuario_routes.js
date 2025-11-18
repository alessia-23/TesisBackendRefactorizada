import { registro, confirmarMail, recuperarPassword, comprobarTokenPassword, cambiarPassword, login } from "../controllers/usuario_controller.js"
import { Router } from "express"

const router = Router()

//Fase de registro del Usuario
router.post("/sign-up", registro)
router.post("/confirm-email/:token", confirmarMail)

//Restaurar contraseñas
router.post("/restore-password", recuperarPassword)
router.post("/restore-password/:token", comprobarTokenPassword)
router.post("/change-password/:token", cambiarPassword)
router.post("/login", login)

export default router
