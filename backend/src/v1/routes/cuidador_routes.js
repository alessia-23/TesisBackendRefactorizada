import {Router} from 'express'
import { registrarCuidador } from '../controllers/cuidador_controller.js'
import { verificarTokenJWT } from '../../core/middleware/JWT.js'
const router = Router()


router.post("/cuidador/registro",registrarCuidador)



export default router