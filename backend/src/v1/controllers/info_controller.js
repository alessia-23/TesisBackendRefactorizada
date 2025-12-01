const informacion = async (req, res) => {
    try {
        res.status(200).json({ msg: "App Mascotas" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

export { informacion };