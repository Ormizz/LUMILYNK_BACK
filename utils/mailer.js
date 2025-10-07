const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",   // ou smtp.gmail.com pour Gmail
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

/**
 * Fonction générique pour envoyer un email
 * @param {Object} options
 * @param {string} options.to - Destinataire principal
 * @param {string} [options.bcc] - Copie cachée
 * @param {string} options.subject - Sujet du mail
 * @param {string} options.html - Contenu HTML
 * @param {string} options.attachments - Contenu HTML
 */
async function sendMail({ to, bcc, subject, html, attachments }) {
    try {
        await transporter.sendMail({
            from: `"LumiLynk" <${process.env.MAIL_USER}>`,
            to,
            bcc,
            subject,
            html,
            attachments: [],
        });
        console.log(`Mail envoyé à ${to}`);
    } catch (err) {
        console.error("Erreur envoi mail :", err);
        throw err;
    }
}

module.exports = { sendMail };
