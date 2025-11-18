import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import usuarioRoutes from './v1/routes/usuario_routes.js'
import avatarRoutes from './v1/routes/avatar_routes.js'
import dogsRoutes from './v1/routes/dog_fact_routes.js'


// Inicializaciones
const app = express()
dotenv.config()

// Middlewares
app.use(express.json())
app.use(cors())

// Variables globales
app.set('port', process.env.PORT || 3000)

// Rutas
app.use("/api/v1/auth", usuarioRoutes)
app.use("/api/v1", avatarRoutes)
app.use("/api/v1", dogsRoutes)

export default app
