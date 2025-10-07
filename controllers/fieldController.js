// controllers/field.controller.js
const db = require("../config/db");

exports.createField = async (req, res) => {
    try {
        const { name } = req.body;
        const sql = "INSERT INTO fields (name) VALUES (?)";
        const [result] = await db.query(sql, [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (err) {
        console.error("Erreur createField:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getAllFields = async (req, res) => {
    try {
        const sql = "SELECT * FROM fields";
        const [results] = await db.query(sql);
        res.status(200).json(results);
    } catch (err) {
        console.error("Erreur getAllFields:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getFieldById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM fields WHERE id = ?";
        const [results] = await db.query(sql, [id]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: "Field not found" });
        }
        
        res.status(200).json(results[0]);
    } catch (err) {
        console.error("Erreur getFieldById:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.updateField = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const sql = "UPDATE fields SET name = ? WHERE id = ?";
        await db.query(sql, [name, id]);
        res.status(200).json({ id, name });
    } catch (err) {
        console.error("Erreur updateField:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.deleteField = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM fields WHERE id = ?";
        await db.query(sql, [id]);
        res.status(200).json({ message: "Field deleted" });
    } catch (err) {
        console.error("Erreur deleteField:", err);
        return res.status(500).json({ error: err.message });
    }
};