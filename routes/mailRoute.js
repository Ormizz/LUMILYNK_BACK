const express = require("express");
const multer = require("multer");
const path = require("path");
const { sendMail } = require("../utils/mailer"); // ton fichier nodemailer
const router = express.Router();

// config multer (upload mémoire ou dossier temporaire)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("attachment"), async (req, res) => {
  try {
    const { subject, body, recipients } = req.body;
    const parsedRecipients = JSON.parse(recipients || "[]");

    if (!parsedRecipients.length) {
      return res.status(400).json({ error: "Aucun destinataire sélectionné" });
    }

    // Prépare les pièces jointes si présentes
    const attachments = req.file
      ? [
          {
            filename: req.file.originalname,
            content: req.file.buffer, // contenu en mémoire
          },
        ]
      : [];

    await sendMail({
        to: recipient.email || recipient, // adapte selon ta structure
        subject,
        html: `<p>${body}</p>`,
        attachments,
    });

    res.json({ success: true, sent: parsedRecipients.length });
    } catch (err) {
        console.error("Erreur envoi mails:", err);
        res.status(500).json({ error: "Erreur lors de l'envoi des emails" });
    }
});

module.exports = router;