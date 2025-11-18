import axios from "axios";
import path from "path";
import fs from "fs";

export async function getAvatar(req, res) {
    try {
        const { style = "adventurer", seed = "alessia" } = req.body;
        const url = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;

        const response = await axios.get(url, { responseType: "text" });

        res.setHeader("Content-Type", "image/svg+xml");
        return res.status(200).send(response.data);

    } catch (err) {
        res.status(500).json({ msg: "Error al generar avatar" });
    }
}

/**
 * Controlador para listar todos los avatares guardados
 */
export async function listAvatars(req, res) {
    try {
        const folderPath = path.resolve("uploads/avatars");

        // Si la carpeta no existe, devolver lista vacía
        if (!fs.existsSync(folderPath)) {
            return res.status(200).json({ avatars: [] });
        }

        // Leer todos los archivos .svg en la carpeta
        const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".svg"));

        // Generar URLs accesibles desde el navegador
        const avatars = files.map(file => ({
            name: file,
            url: `${req.protocol}://${req.get("host")}/avatars/${file}`
        }));

        res.status(200).json({ count: avatars.length, avatars });

    } catch (error) {
        console.error("❌ Error al listar avatares:", error.message);
        res.status(500).json({ msg: "Error al listar avatares" });
    }
}

/**
 * Lista de estilos disponibles en DiceBear v9
 * Documentación: https://www.dicebear.com/styles/
 */
export async function listAvatarStyles(req, res) {
    try {
        const styles = [
            { name: "adventurer", description: "Personajes de aventura, estilo cartoon" },
            { name: "adventurer-neutral", description: "Versión neutral del estilo adventurer" },
            { name: "bottts", description: "Avatares tipo robots, estilo divertido" },
            { name: "big-ears", description: "Caras con orejas grandes, estilo simpático" },
            { name: "big-smile", description: "Caras sonrientes y expresivas" },
            { name: "croodles", description: "Estilo garabato dibujado a mano" },
            { name: "croodles-neutral", description: "Versión neutral de croodles" },
            { name: "fun-emoji", description: "Avatares tipo emoji divertidos" },
            { name: "icons", description: "Iconos minimalistas" },
            { name: "identicon", description: "Diseños geométricos basados en el seed" },
            { name: "initials", description: "Avatares con iniciales de texto" },
            { name: "micah", description: "Caras humanas modernas y suaves" },
            { name: "miniavs", description: "Caricaturas mini estilo flat" },
            { name: "notionists", description: "Estilo tipo Notion, profesional" },
            { name: "open-peeps", description: "Ilustraciones tipo dibujo humano" },
            { name: "pixel-art", description: "Avatares tipo pixel retro" },
            { name: "pixel-art-neutral", description: "Versión neutral de pixel-art" }
        ];

        res.status(200).json({ count: styles.length, styles });
    } catch (error) {
        console.error("❌ Error al listar estilos:", error.message);
        res.status(500).json({ msg: "Error al listar estilos de avatar" });
    }
}

export async function serveAvatar(req, res) {
    try {
        const { filename } = req.params;
        const filePath = path.resolve(`uploads/avatars/${filename}`);

        // Verificamos si el archivo existe
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ msg: "Avatar no encontrado" });
        }

        // Establecemos el encabezado para SVG
        res.setHeader("Content-Type", "image/svg+xml");

        // Enviamos el archivo
        res.sendFile(filePath);
    } catch (error) {
        console.error("❌ Error al servir avatar:", error.message);
        res.status(500).json({ msg: "Error al servir el avatar" });
    }
}
