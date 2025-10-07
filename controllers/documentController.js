// controllers/document.controller.js
const fs = require("fs");
const path = require("path");
const db = require("../config/db");
const { sendMail } = require("../utils/mailer");
const Letters = require("../tempates/emails/Letters");
const documentUploadNotification = require("../tempates/emails/documentUploadNotification");
const adminNotification = require("../tempates/emails/adminNotification");

exports.createDocument = async (req, res) => {
    const { student_id, typedocs_id, status } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: "Aucun fichier reçu" });
    }

    const filename = req.file.originalname;
    const file_url = `/${req.file.path}`;

    try {
        // Insérer le document
        const sqlInsert = `
            INSERT INTO documents (user_id, typedocs_id, filename, file_url, status)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sqlInsert, [student_id, typedocs_id, filename, file_url, status || "Etude"]);
        const documentId = result.insertId;

        // Récupérer les informations de l'étudiant et du type de document
        const studentSql = `SELECT full_name, email FROM users WHERE id = ?`;
        const typeDocSql = `SELECT lib FROM typedocs WHERE id = ?`;

        const [studentResult] = await db.query(studentSql, [student_id]);
        const [typeResult] = await db.query(typeDocSql, [typedocs_id]);

        // Envoyer les notifications par email
        if (studentResult.length > 0 && typeResult.length > 0 && typedocs_id != 2 && typedocs_id != 3) {
            const student = studentResult[0];
            const documentType = typeResult[0].lib;
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
                bcc: "nabankader12@gmail.com, urielsoro@gmail.com",
                subject: "Confirmation de réception de lettres",
                html: documentUploadNotification({
                    studentName: student.full_name,
                    documentType: documentType,
                    formattedDate: formattedDate
                }),
            }).catch(console.error);

            // Envoyer notification aux administrateurs
            sendMail({
                to: "nabankader12@gmail.com, urielsoro@gmail.com",
                subject: "Nouveau document uploadé - LumiLynk",
                html: adminNotification({
                    studentName: student.full_name,
                    studentEmail: student.email,
                    action: "Nouveau document uploadé",
                    details: `L'étudiant ${student.full_name} a uploadé un document de type "${documentType}" (${filename}). Le document est en attente de vérification.`,
                    formattedDate: formattedDate
                }),
            }).catch(console.error);
        }

        let updateSql = null;

        // Si type 2 → mettre à jour offer_letter_id dans applications
        if (typedocs_id == 2) {
            updateSql = `UPDATE applications SET offer_letter_id = ? WHERE user_id = ?`;
        }
        // Si type 3 → mettre à jour admission_letter_id dans applications
        else if (typedocs_id == 3) {
            updateSql = `UPDATE applications SET admission_letter_id = ? WHERE user_id = ?`;
        }

        if (updateSql) {
            await db.query(updateSql, [documentId, student_id]);

            // Chercher l'email de l'étudiant
            const emailSql = `SELECT full_name, email FROM users WHERE id = ?`;
            const [emailResult] = await db.query(emailSql, [student_id]);

            if (emailResult.length > 0) {
                const student = emailResult[0];
                let purpose;
                if (typedocs_id == 2) {
                    purpose = "Lettre d'offre";
                } else if (typedocs_id == 3) {
                    purpose = "Lettre d'admission";
                }

                const now = new Date();
                const formattedDate = new Intl.DateTimeFormat("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }).format(now);

                // Envoi de l'email
                sendMail({
                    to: student.email,
                    bcc: "nabankader12@gmail.com, urielsoro@gmail.com",
                    subject: "Nouveau document ajouté",
                    html: Letters({ name: student.full_name, formattedDate, purpose }),
                }).catch(console.error);
            }

            return res.status(201).json({
                message: "Document ajouté et application mise à jour",
                documentId,
            });
        } else {
            return res.status(201).json({
                message: "Document ajouté avec succès",
                documentId,
            });
        }
    } catch (err) {
        console.error("Erreur createDocument:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getAllDocuments = async (req, res) => {
    try {
        const sql = `
            SELECT
                documents.id,
                documents.filename,
                documents.typedocs_id,
                typedocs.lib as type_name,
                documents.file_url,
                documents.status,
                documents.uploaded_at,
                users.full_name
            FROM documents
            JOIN users ON documents.user_id = users.id
            JOIN typedocs ON documents.typedocs_id = typedocs.id
            WHERE typedocs_id != 2 AND typedocs_id != 3
            ORDER BY documents.uploaded_at DESC
        `;

        const [results] = await db.query(sql);
        res.status(200).json(results);
    } catch (err) {
        console.error("Erreur SQL getAllDocuments:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getDocumentByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
            SELECT * FROM documents
            WHERE user_id = ?
            AND typedocs_id != 2 AND typedocs_id != 3
        `;

        const [result] = await db.query(sql, [id]);
        res.status(200).json(result);
    } catch (err) {
        console.error("Erreur getDocumentByUserId:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getLettersByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
            SELECT * FROM documents
            WHERE user_id = ?
            AND (typedocs_id = 2 OR typedocs_id = 3)
        `;

        const [result] = await db.query(sql, [id]);
        res.status(200).json(result);
    } catch (err) {
        console.error("Erreur getLettersByUserId:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getAllLetters = async (req, res) => {
    try {
        const sql = `
            SELECT
                documents.id,
                documents.filename,
                documents.typedocs_id,
                documents.file_url,
                documents.status,
                documents.uploaded_at,
                users.full_name
            FROM documents
            JOIN users ON documents.user_id = users.id
            WHERE typedocs_id = 2 OR typedocs_id = 3
            ORDER BY documents.uploaded_at DESC
        `;

        const [result] = await db.query(sql);
        res.status(200).json(result);
    } catch (err) {
        console.error("Erreur getAllLetters:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.updateDocument = async (req, res) => {
    const { id } = req.params;
    const { file_url, type } = req.body;

    try {
        const sql = "UPDATE documents SET file_url = ?, type = ? WHERE id = ?";
        await db.query(sql, [file_url, type, id]);
        res.status(200).json({ message: "Document mis à jour" });
    } catch (err) {
        console.error("Erreur updateDocument:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.deleteDocument = async (req, res) => {
    const { id } = req.params;

    try {
        // Récupérer le fichier avant de le supprimer en DB
        const [rows] = await db.query("SELECT file_url FROM documents WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Document introuvable" });
        }

        const filePath = rows[0].file_url;
        const absolutePath = path.join(__dirname, "..", filePath);

        // Supprimer physiquement le fichier
        if (filePath && fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
            console.log("Fichier supprimé :", absolutePath);
        } else {
            console.log("Fichier introuvable :", absolutePath);
        }

        // Supprimer le document dans la base
        await db.query("DELETE FROM documents WHERE id = ?", [id]);

        return res.json({ message: "Document supprimé avec succès" });

    } catch (err) {
        console.error("Erreur suppression document:", err);
        return res.status(500).json({
            message: "Erreur lors de la suppression",
            error: err.message
        });
    }
};

exports.updateStatus = async (req, res) => {
    const documentId = req.params.id;
    const { status } = req.body;

    if (!["Accepte", "Refuse", "Etude"].includes(status)) {
        return res.status(400).json({ error: "Statut invalide" });
    }

    try {
        const sql = `UPDATE documents SET status = ? WHERE id = ?`;
        await db.query(sql, [status, documentId]);

        // Récupérer les informations du document et de l'étudiant
        const documentInfoSql = `
            SELECT d.filename, d.typedocs_id, u.full_name, u.email, t.lib as type_name
            FROM documents d
            JOIN users u ON d.user_id = u.id
            JOIN typedocs t ON d.typedocs_id = t.id
            WHERE d.id = ?
        `;

        const [docResult] = await db.query(documentInfoSql, [documentId]);

        if (docResult.length > 0) {
            // Vous pouvez ajouter ici l'envoi d'email de notification si nécessaire
            const doc = docResult[0];
            // sendMail({ ... }).catch(console.error);
        }

        res.status(200).json({ message: "Statut mis à jour avec succès" });

    } catch (err) {
        console.error("Erreur updateStatus:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.uploadDocuments = async (req, res) => {
    const { student_id } = req.body;
    const files = req.files;

    if (!student_id || !files) {
        return res.status(400).json({ message: 'Champs manquants' });
    }

    const typedocsMap = {
        identity: 1,
        diploma: 7,
        transcripts: 4,
        photo: 8,
    };

    const documents = [];

    for (const key in files) {
        const file = files[key][0];
        const file_url = `/uploads/documents/${file.filename}`;
        const filename = file.originalname;
        const typedocs_id = typedocsMap[key];

        documents.push([student_id, typedocs_id, filename, file_url]);
    }

    try {
        const sql = `
            INSERT INTO documents (user_id, typedocs_id, filename, file_url)
            VALUES ?
        `;
        const [result] = await db.query(sql, [documents]);

        // Récupérer les informations de l'étudiant pour l'envoi d'email
        const studentSql = `SELECT full_name, email FROM users WHERE id = ?`;
        const [studentResult] = await db.query(studentSql, [student_id]);

        if (studentResult.length > 0) {
            // Vous pouvez ajouter ici l'envoi d'email de notification si nécessaire
            const student = studentResult[0];
            // sendMail({ ... }).catch(console.error);
        }

        res.status(201).json({ message: 'Documents enregistrés', inserted: result.affectedRows });

    } catch (err) {
        console.error("Erreur uploadDocuments:", err);
        return res.status(500).json({ error: err.message });
    }
};

exports.replaceDocument = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    if (!req.file) {
        return res.status(400).json({ error: "Aucun fichier reçu" });
    }
    const newFilename = req.file.originalname;
    const newFileUrl = `/${req.file.path}`;

    try {
        // Récupérer l'ancien document
        const [rows] = await db.query(
            "SELECT file_url, user_id, typedocs_id FROM documents WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            // Supprimer le nouveau fichier uploadé car le document n'existe pas
            if (fs.existsSync(newFileUrl)) {
                fs.unlinkSync(newFileUrl);
            }
            return res.status(404).json({ message: "Document introuvable" });
        }

        const oldFileUrl = rows[0].file_url;
        const userId = rows[0].user_id;
        const typedocsId = rows[0].typedocs_id;

        // Supprimer physiquement l'ancien fichier
        if (oldFileUrl) {
            const oldAbsolutePath = path.join(__dirname, "..", oldFileUrl);
            if (fs.existsSync(oldAbsolutePath)) {
                fs.unlinkSync(oldAbsolutePath);
                console.log("Ancien fichier supprimé :", oldAbsolutePath);
            }
        }

        // Mettre à jour le document dans la base avec le nouveau fichier
        const updateSql = `
            UPDATE documents 
            SET filename = ?, file_url = ?, status = 'Etude', uploaded_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        await db.query(updateSql, [newFilename, newFileUrl, id]);

        // Récupérer les informations de l'étudiant pour notification
        const studentSql = `SELECT full_name, email FROM users WHERE id = ?`;
        const typeDocSql = `SELECT lib FROM typedocs WHERE id = ?`;

        const [studentResult] = await db.query(studentSql, [userId]);
        const [typeResult] = await db.query(typeDocSql, [typedocsId]);

        // Envoyer notification par email
        if (studentResult.length > 0 && typeResult.length > 0) {
            const student = studentResult[0];
            const documentType = typeResult[0].lib;
            const now = new Date();
            const formattedDate = new Intl.DateTimeFormat("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }).format(now);

            // Notification à l'étudiant
            sendMail({
                to: student.email,
                bcc: "nabankader12@gmail.com, urielsoro@gmail.com",
                subject: "Document remplacé avec succès",
                html: documentUploadNotification({
                    studentName: student.full_name,
                    documentType: documentType,
                    formattedDate: formattedDate
                }),
            }).catch(console.error);

            // Notification aux admins
            sendMail({
                to: "nabankader12@gmail.com, urielsoro@gmail.com",
                subject: "Document remplacé - LumiLynk",
                html: adminNotification({
                    studentName: student.full_name,
                    studentEmail: student.email,
                    action: "Document remplacé",
                    details: `L'étudiant ${student.full_name} a remplacé un document de type "${documentType}" par un nouveau fichier (${newFilename}). Le document est en attente de vérification.`,
                    formattedDate: formattedDate
                }),
            }).catch(console.error);
        }

        res.status(200).json({
            message: "Document remplacé avec succès",
            documentId: id,
            filename: newFilename
        });

    } catch (err) {
        console.error("Erreur replaceDocument:", err);
        
        // En cas d'erreur, supprimer le nouveau fichier uploadé
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        return res.status(500).json({
            message: "Erreur lors du remplacement du document",
            error: err.message
        });
    }
};