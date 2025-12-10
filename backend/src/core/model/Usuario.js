import { Schema, model } from 'mongoose'
import bcrypt from "bcryptjs"


const ownerSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    direccion: { type: String, trim: true, default: null },
    celular: { type: String, trim: true, default: null },
    email: { type: String, required: true, trim: true, unique: true },
    fechaNacimiento: { type: Date, required: true },
    password: { type: String, required: true },
    token: { type: String, default: null },
    status: { type: Boolean, default: false },
    confirmEmail: { type: Boolean, default: false },
    rol: { type: String, default: "Dueño" |""},
    photo: { type: String, default:""}

}, { timestamps: true })


// Método para cifrar el password
ownerSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password, salt)
    return passwordEncryp
}


// Método para verificar si el password es el mismo de la BDD
ownerSchema.methods.matchPassword = async function (password) {
    const response = await bcrypt.compare(password, this.password)
    return response
}

// Método para crear un token 
ownerSchema.methods.createToken = function () {
    const tokenGenerado = Math.random().toString(36).slice(2)
    this.token = tokenGenerado
    return tokenGenerado
}


export default model('Usuario', ownerSchema)