// models/Cuidador.js
import { Schema, model } from 'mongoose'
import bcrypt from "bcryptjs"

const cuidadorSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    cedula: { type: String, required: true, trim: true },
    direccion: { type: String, trim: true, default: null },
    celular: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    fechaNacimiento: { type: Date, default: null },

    // password se llenará desde el controlador 
    password: { type: String, required: true },

    token: { type: String, default: null },
    status: { type: Boolean, default: true },
    confirmEmail: { type: Boolean, default: false },
    rol: { type: String, default: "Cuidador" },

    // Campos de imagen 
    avatar: { type: String, default: null },        
    avatarID: { type: String, default: null },      
    avatarIA: { type: String, default: null },     

    // Mascotas asignadas
    mascotasAsignadas: [{
        type: Schema.Types.ObjectId,
        ref: "Paciente",
        default: []
    }]

}, { timestamps: true })

// Método para cifrar password
cuidadorSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

// Comparar password
cuidadorSchema.methods.matchPassword = async function(password){
    return bcrypt.compare(password, this.password)
}

// Crear token
cuidadorSchema.methods.createToken = function (){
    const tokenGenerado = Math.random().toString(36).slice(2)
    this.token = tokenGenerado
    return tokenGenerado
}

export default model("Cuidador", cuidadorSchema)
