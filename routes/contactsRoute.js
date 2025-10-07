const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { sendMail } = require("../utils/mailer");
const notification = require("../tempates/emails/notification");
const accuseRep = require("../tempates/emails/accuseRep");


// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Veuillez remplir les champs obligatoires." });
  }

  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(now);

  // Mail reçu par l’admin
  await sendMail({
    to: "info@lumilynk.com",
    bcc: "nabankader12@gmail.com, urielsoro@gmail.com",
    subject: subject || "Nouveau message depuis le formulaire de contact",
    html: notification({ name, email, phone, subject, message }),
  });

  // Accusé de réception au client
  await sendMail({
    to: email,
    subject: "Merci de nous avoir contactés - LumiLynk",
    html: accuseRep(name, formattedDate),
  });

  res.json({ success: true, message: "Message envoyé avec succès !" });
  
});

module.exports = router;
