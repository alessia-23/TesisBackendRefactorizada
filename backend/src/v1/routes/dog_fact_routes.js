import { getRandomFact } from "../client/dogs/getDogs.js"
import { Router } from "express"

const router = Router()

/**
 * @swagger
 * /dogs/random-fact:
 *   get:
 *     summary: Obtener un dato curioso aleatorio sobre perros
 *     tags: [Dogs]
 *     responses:
 *       200:
 *         description: Dato curioso obtenido exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.get("/dogs/random-fact", getRandomFact)

export default router
