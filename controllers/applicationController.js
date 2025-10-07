// controllers/application.controller.js
const db = require("../config/db");
const emailService = require("../services/emailService");

// Créer une nouvelle application
exports.createApplication = async (req, res) => {
    const { user_id, field_id, level_id } = req.body;
    
    try {
        // Insérer l'application
        const insertSql = "INSERT INTO `applications`(`user_id`, `field_id`, `level_id`) VALUES (?, ?, ?)";
        const [result] = await db.query(insertSql, [user_id, field_id, level_id]);
        
        try {
            // Récupérer les données complètes pour l'email
            const dataSql = `
                SELECT 
                    u.full_name, u.email,
                    f.name as field_name,
                    l.lib as level_name
                FROM users u
                JOIN fields f ON f.id = ?
                JOIN levels l ON l.id = ?
                WHERE u.id = ?
            `;
            
            const [dataResults] = await db.query(dataSql, [field_id, level_id, user_id]);
            
            if (dataResults.length === 0) {
                return res.status(201).json({ 
                    message: "Application créée (données utilisateur non trouvées)", 
                    id: result.insertId 
                });
            }
            
            const userData = dataResults[0];
            
            // Envoyer les notifications par email
            try {
                await emailService.sendApplicationCreatedNotification(
                    {
                        full_name: userData.full_name,
                        email: userData.email
                    },
                    {
                        fieldName: userData.field_name,
                        levelName: userData.level_name
                    }
                );
                
                res.status(201).json({ 
                    message: "Application créée et notifications envoyées", 
                    id: result.insertId 
                });
            } catch (emailError) {
                console.error('Erreur envoi email:', emailError);
                res.status(201).json({ 
                    message: "Application créée (erreur envoi email)", 
                    id: result.insertId
                });
            }
        } catch (dataError) {
            console.error('Erreur récupération données:', dataError);
            // L'application est créée mais pas d'email envoyé
            return res.status(201).json({ 
                message: "Application créée (email non envoyé)", 
                id: result.insertId 
            });
        }
    } catch (error) {
        console.error('Erreur création application:', error);
        res.status(500).json({ error: "Erreur lors de la création de l'application" });
    }
};

// Récupérer toutes les applications
exports.getAllApplications = async (req, res) => {
    try {
        const sql = "SELECT * FROM applications";
        const [results] = await db.query(sql);
        res.status(200).json(results);
    } catch (err) {
        console.error('Erreur getAllApplications:', err);
        return res.status(500).json({ error: err.message });
    }
};

// Récupérer une application par ID
exports.getApplicationById = async (req, res) => {
    try {
        const sql = "SELECT * FROM applications WHERE user_id = ?";
        const [results] = await db.query(sql, [req.params.id]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: "Application non trouvée" });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        console.error('Erreur getApplicationById:', err);
        return res.status(500).json({ error: err.message });
    }
};

// Mettre à jour une application
exports.updateApplication = async (req, res) => {
    try {
        const { user_id, field_id, status } = req.body;
        const sql = "UPDATE applications SET user_id = ?, field_id = ?, status = ? WHERE id = ?";
        await db.query(sql, [user_id, field_id, status, req.params.id]);
        res.status(200).json({ message: "Application mise à jour" });
    } catch (err) {
        console.error('Erreur updateApplication:', err);
        return res.status(500).json({ error: err.message });
    }
};

// Supprimer une application
exports.deleteApplication = async (req, res) => {
    try {
        const sql = "DELETE FROM applications WHERE id = ?";
        await db.query(sql, [req.params.id]);
        res.status(200).json({ message: "Application supprimée" });
    } catch (err) {
        console.error('Erreur deleteApplication:', err);
        return res.status(500).json({ error: err.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    let { status, studentId } = req.body;

    // Validation du statut
    const validStatuses = ['etude_payee','offre_envoyee','admission_envoyee','visa'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            message: "Statut invalide",
            validStatuses
        });
    }

    try {
        const [userRows] = await db.query(
            "SELECT full_name, email FROM users WHERE id = ?",
            [studentId]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const userData = userRows[0];

        const [updateResult] = await db.query(
            "UPDATE applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?",
            [status, studentId]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "Application non trouvée" });
        }

        console.log(status);
        
        // Convertir le statut pour l'email
        let statusLabel = status;
        if (status === 'admission_envoyee') {
            statusLabel = "Lettre d'admission";
        } else if (status === 'offre_envoyee') {
            statusLabel = "Lettre d'offre";
        } else if (status === 'etude_payee') {
            statusLabel = "Etude de dossier";
        } else {
            statusLabel = "Visa";
        }
        
        console.log(statusLabel);
        
        try {
            await emailService.sendStatusUpdated(userData, statusLabel);
        } catch (emailError) {
            console.error("Erreur envoi email:", emailError);
        }

        return res.status(200).json({
            message: "Statut mis à jour avec succès",
            newStatus: status,
            student: userData
        });

    } catch (err) {
        console.error("Erreur updateApplicationStatus:", err);
        return res.status(500).json({ error: "Erreur serveur" });
    }
};