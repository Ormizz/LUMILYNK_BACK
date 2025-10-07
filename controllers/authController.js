const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailService = require("../services/emailService");

const SALT_ROUNDS = 10;

// Enregistrement d'un utilisateur
exports.register = async (req, res) => {
    const { full_name, email, password, phone, dateNaissance } = req.body;
    
    // Vérifie les champs requis
    if (!full_name || !email || !password || !phone || !dateNaissance) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    
    try {
        // Vérifier si l'email existe déjà
        const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }
        
        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        
        // Insérer le nouvel utilisateur
        const sql = "INSERT INTO users (full_name, email, password, phone, dateNaissance) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.query(sql, [full_name, email, hashedPassword, phone, dateNaissance]);
        
        // Répondre immédiatement avec succès
        res.status(201).json({
            message: "Inscription réussie",
            userId: result.insertId
        });
        
        // Envoyer l'email de bienvenue (asynchrone, sans bloquer la réponse)
        try {
            await emailService.sendWelcomeEmail({
                full_name: full_name,
                email: email,
                phone: phone
            });
        } catch (emailError) {
            console.error("Erreur envoi email de bienvenue:", emailError);
            // On continue même si l'email échoue
        }
        
    } catch (err) {
        console.error("Erreur lors de l'inscription:", err);
        return res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Rechercher l'utilisateur par email
        const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé ou mot de passe incorrect" });
        }
        
        const user = results[0];
        
        // Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
        }
        
        // Générer le token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
        );
        
        res.status(200).json({
            message: "Connexion réussie",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
        
    } catch (err) {
        console.error("Erreur lors de la connexion:", err);
        return res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};