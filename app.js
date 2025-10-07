const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

app.use('/uploads', express.static('uploads'));


require('dotenv').config();


// Importation des routes
const userRoutes = require("./routes/usersRoute");
const applicationRoutes = require("./routes/applicationsRoute");
const documentRoutes = require("./routes/documentsRoute");
const paymentRoutes = require("./routes/paymentsRoute");
const fieldRoutes = require("./routes/fieldsRoute");
const authRoutes = require("./routes/authRoute");
const levelRoutes = require("./routes/levelsRoute");
const contactRoutes = require("./routes/contactsRoute");
const mailRoutes = require("./routes/mailRoute");

// Déclaration des routes
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/levels/", levelRoutes);
app.use("/api/contacts/", contactRoutes);
app.use("/api/mail/", mailRoutes);

// Route test
app.get("/", (req, res) => {
    res.send("API LumiLynk en ligne !");
});

// Démarrage du serveur
const PORT = 3002;
const HOST = "localhost";
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://${HOST}:${PORT}`);
});
