import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import usuarioRoutes from './v1/routes/usuario_routes.js'
import avatarRoutes from './v1/routes/avatar_routes.js'
import dogsRoutes from './v1/routes/dog_fact_routes.js'
import swaggerDocs from "../src/docs/swagger.js";
import cloudinary from 'cloudinary'
import fileUpload from "express-fileupload"
import routerCuidador from './v1/routes/cuidador_routes.js'


// Inicializaciones
const app = express()
dotenv.config()

//Documentacion con swagger
swaggerDocs(app);

// Middlewares
app.use(express.json())
app.use(cors())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}))

// Variables globales
app.set('port', process.env.PORT || 3000)

// Rutas
app.get('/', (req, res) => res.send("Server on - App Mascotas"))
app.use("/api/v1", avatarRoutes)
app.use("/api/v1/auth", usuarioRoutes)
app.use("/api/v1", dogsRoutes)
app.use("/api/v1",routerCuidador)


// Configuraciones
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
export default app
