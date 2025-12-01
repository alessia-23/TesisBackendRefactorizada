/**
 * @swagger
 * tags:
 *   name: Avatar
 *   description: Endpoints para generación y consulta de estilos de avatares
 */

import { getAvatar, listAvatars, listAvatarStyles, serveAvatar } from "../client/avatar/getAvatar.js"
import { Router } from "express"

const router = Router()

/**
 * @swagger
 * /avatar/generate:
 *   post:
 *     summary: Generar un avatar dinámico desde DiceBear
 *     description: Genera un avatar en formato SVG utilizando un estilo y un seed. No se guarda en el servidor.
 *     tags: [Avatar]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               style:
 *                 type: string
 *                 example: "adventurer"
 *               seed:
 *                 type: string
 *                 example: "alessia"
 *     responses:
 *       200:
 *         description: Avatar generado correctamente en formato SVG
 *         content:
 *           image/svg+xml:
 *             schema:
 *               type: string
 */
router.post("/avatar/generate", getAvatar)

/**
 * @swagger
 * /avatar/get-all:
 *   get:
 *     summary: Listar avatares guardados
 *     description: Actualmente no se almacenan avatares, así que retorna una lista vacía.
 *     tags: [Avatar]
 *     responses:
 *       200:
 *         description: Lista vacía de avatares
 */
router.get("/avatar/get-all", listAvatars)

/**
 * @swagger
 * /avatar/styles:
 *   get:
 *     summary: Listar estilos disponibles de avatar
 *     description: Devuelve todos los estilos soportados por DiceBear v9.
 *     tags: [Avatar]
 *     responses:
 *       200:
 *         description: Lista de estilos disponibles
 */
router.get("/avatar/styles", listAvatarStyles)

/**
 * @swagger
 * /avatar/source/{filename}:
 *   get:
 *     summary: Intentar obtener un archivo fuente del servidor
 *     description: Este servidor ya no almacena imágenes, por lo que siempre devuelve error.
 *     tags: [Avatar]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del archivo solicitado
 *     responses:
 *       404:
 *         description: Los avatares no se almacenan en el servidor
 */
router.get("/avatar/source/:filename", serveAvatar);

export default router
