// controllers/payment.controller.js
const fs = require("fs");
const path = require("path");
const db = require("../config/db");
const { sendMail } = require("../utils/mailer");
const paymentNotification = require("../tempates/emails/paymentNotification");
const adminNotification = require("../tempates/emails/adminNotification");
const paymentconfirmation = require("../tempates/emails/paymentconfirmation");

exports.createPayment = async (req, res) => {
    const { reference, amount, type, status, date, application_id } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'Preuve de paiement manquante.' });
    }

    const proof_url = `/uploads/transactions/${file.filename}`;

    try {
        const sql = `
            INSERT INTO payments (application_id, reference, amount, type, status, proof_url, uploaded_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [application_id, reference, amount, type, status, proof_url, date];

        const [result] = await db.query(sql, values);

        // Récupérer les informations de l'étudiant pour l'envoi d'email
        const studentSql = `
            SELECT u.full_name, u.email
            FROM users u
            JOIN applications a ON u.id = a.user_id
            WHERE a.id = ?
        `;

        const [studentResult] = await db.query(studentSql, [application_id]);

        if (studentResult.length > 0) {
            const student = studentResult[0];
            const now = new Date();
            const formattedDate = new Intl.DateTimeFormat("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }).format(now);
            
            // Envoyer notification à l'étudiant
            sendMail({
                to: student.email,
                subject: "Confirmation de réception de paiement",
                html: paymentNotification({
                    studentName: student.full_name,
                    amount: amount,
                    reference: reference,
                    formattedDate: formattedDate,
                    type: type || "paiement"
                }),
            }).catch(console.error);

            // Envoyer notification aux administrateurs
            sendMail({
                to: "nabankader12@gmail.com, urielsoro@gmail.com",
                subject: "Nouveau paiement uploadé - LumiLynk",
                html: adminNotification({
                    studentName: student.full_name,
                    studentEmail: student.email,
                    action: "Nouveau paiement uploadé",
                    details: `L'étudiant ${student.full_name} a uploadé un paiement de ${amount} FCFA (Référence: ${reference}). Le fichier de preuve est disponible pour vérification.`,
                    formattedDate: formattedDate
                }),
            }).catch(console.error);
        }

        res.status(201).json({ message: 'Paiement ajouté', paymentId: result.insertId });

    } catch (err) {
        console.error("Erreur createPayment:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const sql = `
            SELECT
                p.id, p.reference, p.amount, p.type, p.status,
                p.proof_url, p.uploaded_at AS date, u.full_name AS nom
            FROM payments p
            JOIN applications a ON p.application_id = a.id
            JOIN users u ON a.user_id = u.id
            ORDER BY p.uploaded_at DESC
        `;

        const [results] = await db.query(sql);
        res.status(200).json(results);
    } catch (err) {
        console.error("Erreur SQL getAllPayments:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getPaymentByUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);

    try {
        const sql = `
            SELECT p.* FROM payments p
            JOIN applications a ON p.application_id = a.id
            WHERE a.user_id = ?
        `;

        const [results] = await db.query(sql, [userId]);
        res.status(200).json(results);
    } catch (err) {
        console.error("Erreur SQL getPaymentByUser:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getPaymentById = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("SELECT * FROM payments WHERE id = ?", [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Paiement non trouvé" });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        console.error("Erreur getPaymentById:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.updatePayment = async (req, res) => {
    const { id } = req.params;
    const { type, proof_url, status } = req.body;

    try {
        const sql = "UPDATE payments SET type = ?, proof_url = ?, status = ? WHERE id = ?";
        await db.query(sql, [type, proof_url, status, id]);
        res.status(200).json({ message: "Paiement mis à jour" });
    } catch (err) {
        console.error("Erreur updatePayment:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.deletePayment = async (req, res) => {
    const { id } = req.params;

    try {
        // Récupérer le fichier de preuve avant de supprimer le paiement
        const [rows] = await db.query("SELECT proof_url FROM payments WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Paiement introuvable" });
        }

        const proofUrl = rows[0].proof_url;

        // Supprimer physiquement le fichier de preuve si il existe
        if (proofUrl) {
            // Nettoyer le chemin (enlever le / au début si présent)
            const cleanPath = proofUrl.startsWith('/') ? proofUrl.substring(1) : proofUrl;
            const absolutePath = path.join(__dirname, "..", cleanPath);

            if (fs.existsSync(absolutePath)) {
                fs.unlinkSync(absolutePath);
                console.log("Fichier de preuve supprimé :", absolutePath);
            } else {
                console.log("Fichier de preuve introuvable :", absolutePath);
            }
        }

        // Supprimer le paiement dans la base de données
        await db.query("DELETE FROM payments WHERE id = ?", [id]);

        res.status(200).json({ message: "Paiement supprimé avec succès" });

    } catch (err) {
        console.error("Erreur deletePayment:", err);
        return res.status(500).json({
            message: "Erreur lors de la suppression",
            error: err.message
        });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const sql = 'UPDATE payments SET status = ? WHERE id = ?';
        await db.query(sql, [status, id]);

        // Récupérer les informations du paiement et de l'étudiant pour l'envoi d'email
        const paymentInfoSql = `
            SELECT p.amount, p.reference, p.type, u.full_name, u.email, p.status
            FROM payments p
            JOIN applications a ON p.application_id = a.id
            JOIN users u ON a.user_id = u.id
            WHERE p.id = ?
        `;

        const [paymentResult] = await db.query(paymentInfoSql, [id]);

        if (paymentResult.length > 0) {
            const paymentInfo = paymentResult[0];
            const now = new Date();
            const formattedDate = new Intl.DateTimeFormat("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }).format(now);

            // Envoyer notification à l'étudiant
            sendMail({
                to: paymentInfo.email,
                subject: `Confirmation de ${status} de paiement`,
                html: paymentconfirmation({
                    studentName: paymentInfo.full_name,
                    amount: paymentInfo.amount,
                    reference: paymentInfo.reference,
                    type: paymentInfo.type,
                    status: status,
                    formattedDate: formattedDate
                }),
            }).catch(console.error);
        }

        res.status(200).json({ message: 'Statut mis à jour' });

    } catch (err) {
        console.error("Erreur updatePaymentStatus:", err);
        return res.status(500).json({ error: err.message });
    }
};