// controllers/user.controller.js
const db = require("../config/db");

exports.createUser = async (req, res) => {
    const { full_name, email, password } = req.body;

    try {
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [full_name, email, password]);
        res.status(201).json({ message: "Utilisateur créé", userId: result.insertId });
    } catch (err) {
        console.error("Erreur createUser:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const sql = `
            SELECT u.id, u.full_name, u.email, u.phone, u.country, u.city, a.status 
            FROM users u 
            LEFT JOIN applications a ON u.id = a.user_id 
            WHERE u.role = 'std'
        `;
        const [results] = await db.query(sql);
        res.status(200).json(results);
    } catch (err) {
        console.error("Erreur getAllUsers:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        console.error("Erreur getUserById:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
        await db.query(sql, [name, email, password, id]);
        res.status(200).json({ message: "Utilisateur mis à jour" });
    } catch (err) {
        console.error("Erreur updateUser:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.updateRest = async (req, res) => {
    const { id } = req.params;
    const { country, city, pere, mere } = req.body;

    try {
        const sql = "UPDATE users SET country = ?, city = ?, pere = ?, mere = ? WHERE id = ?";
        await db.query(sql, [country, city, pere, mere, id]);
        res.status(200).json({ message: "Utilisateur mis à jour" });
    } catch (err) {
        console.error("Erreur updateRest:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM users WHERE id = ?", [id]);
        res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (err) {
        console.error("Erreur deleteUser:", err);
        return res.status(500).json({ error: err.message });
    }
};

// PUT /api/users/first-login/:id
exports.setFirstLoginFalse = async (req, res) => {
    const userId = req.params.id;

    try {
        const sql = "UPDATE users SET first_login = 0 WHERE id = ?";
        await db.query(sql, [userId]);
        res.status(200).json({ message: "first_login mis à false avec succès" });
    } catch (err) {
        console.error("Erreur setFirstLoginFalse:", err);
        return res.status(500).json({ error: err.message });
    }
};