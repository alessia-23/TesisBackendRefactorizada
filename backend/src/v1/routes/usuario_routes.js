import { registro, confirmarMail, recuperarPassword, comprobarTokenPassword, cambiarPassword, login, perfil,actualizarPerfil, actualizarPassword } from "../controllers/usuario_controller.js"
import { verificarTokenJWT } from "../../core/middleware/JWT.js"
import { Router } from "express"

const router = Router()

//Fase de registro del Usuario
router.post("/sign-up", registro)
router.post("/confirm-email/:token", confirmarMail)

//Restaurar contraseñas
router.post("/restore-password", recuperarPassword)
router.post("/restore-password/:token", comprobarTokenPassword)
router.post("/change-password/:token", cambiarPassword)

// Login del usuario
router.post("/login", login)

// Pefil de usuario 
router.get("/perfil",verificarTokenJWT,perfil)

// Actualizar perfil
router.put("/actualizar-perfil/:id", verificarTokenJWT, actualizarPerfil)

//Actualizar contraseñas
router.put("/actualizar-password/:id", verificarTokenJWT, actualizarPassword)

export default router
