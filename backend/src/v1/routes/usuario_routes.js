import { registro, confirmarMail, recuperarPassword, comprobarTokenPassword, cambiarPassword, login, perfil, actualizarPerfil, actualizarPassword } from "../controllers/usuario_controller.js"
import { verificarTokenJWT } from "../../core/middleware/JWT.js"
import { Router } from "express"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints relacionados con usuarios
 */

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro exitoso, revisar correo para confirmar
 */
router.post("/sign-up", registro)

/**
 * @swagger
 * /auth/confirm-email/{token}:
 *   post:
 *     summary: Confirmar cuenta mediante token enviado al correo
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cuenta confirmada correctamente
 */
router.post("/confirm-email/:token", confirmarMail)

/**
 * @swagger
 * /auth/restore-password:
 *   post:
 *     summary: Enviar correo para recuperar contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo enviado para restaurar contraseña
 */
router.post("/restore-password", recuperarPassword)

/**
 * @swagger
 * /auth/restore-password/{token}:
 *   post:
 *     summary: Verificar token para restaurar contraseña
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token confirmado
 */
router.post("/restore-password/:token", comprobarTokenPassword)

/**
 * @swagger
 * /auth/change-password/{token}:
 *   post:
 *     summary: Cambiar contraseña mediante token válido
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña cambiada correctamente
 */
router.post("/change-password/:token", cambiarPassword)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token y datos del usuario
 */
router.post("/login", login)

/**
 * @swagger
 * /auth/perfil:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del perfil
 */
router.get("/perfil/:id", verificarTokenJWT, perfil)

/**
 * @swagger
 * /auth/actualizar-perfil/{id}:
 *   put:
 *     summary: Actualizar datos del perfil del usuario
 *     security:
 *       - bearerAuth: []
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               direccion:
 *                 type: string
 *               celular:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado
 */
router.put("/actualizar-perfil/:id", verificarTokenJWT, actualizarPerfil)

/**
 * @swagger
 * /auth/actualizar-password/{id}:
 *   put:
 *     summary: Actualizar contraseña desde el perfil
 *     security:
 *       - bearerAuth: []
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passwordactual:
 *                 type: string
 *               passwordnuevo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 */
router.put("/actualizar-password/:id", verificarTokenJWT, actualizarPassword)

export default router
