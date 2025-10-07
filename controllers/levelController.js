// controllers/field.controller.js
const db = require("../config/db"); // Connexion MySQL

exports.getAllLevels = async (req, res) => {
    try {
        const sql = "SELECT * FROM levels";
        const [results] = await db.query(sql);
        res.status(200).json(results);
    } catch (err) {
        console.error("Erreur getAllLevels:", err);
        return res.status(500).json({ error: err.message });
    }
};