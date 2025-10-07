const { sendMail } = require("../utils/mailer");
const paymentNotification = require("../tempates/emails/paymentNotification");
const documentUploadNotification = require("../tempates/emails/documentUploadNotification");
const adminNotification = require("../tempates/emails/adminNotification");
const statusUpdateNotification = require("../tempates/emails/statusUpdateNotification");
const welcomeEmail = require("../tempates/emails/welcomeEmail");
const applicationCreatedNotification = require("../tempates/emails/applicationCreatedNotification");
const emailLogger = require("../utils/emailLogger");

class EmailService {
  constructor() {
    this.adminEmails = "nabankader12@gmail.com, urielsoro@gmail.com, info@lumilynk.com";
  }

  /**
   * Envoie une notification de paiement uploadé
   */
  async sendPaymentUploadNotification(studentData, paymentData) {
    const formattedDate = this.formatDate(new Date());
    
    try {
      // Notification à l'étudiant
      await sendMail({
        to: studentData.email,
        subject: "Confirmation de réception de paiement",
        html: paymentNotification({
          studentName: studentData.full_name,
          amount: paymentData.amount,
          reference: paymentData.reference,
          formattedDate: formattedDate,
          type: paymentData.type || "paiement"
        }),
      });

      // Notification aux administrateurs
      await sendMail({
        to: this.adminEmails,
        subject: "Nouveau paiement uploadé - LumiLynk",
        html: adminNotification({
          studentName: studentData.full_name,
          studentEmail: studentData.email,
          action: "Nouveau paiement uploadé",
          details: `L'étudiant ${studentData.full_name} a uploadé un paiement de ${paymentData.amount} FCFA (Référence: ${paymentData.reference}). Le fichier de preuve est disponible pour vérification.`,
          formattedDate: formattedDate
        }),
      });

      emailLogger.success(`Notifications de paiement envoyées pour ${studentData.full_name}`, {
        student: studentData.full_name,
        amount: paymentData.amount,
        reference: paymentData.reference
      });
    } catch (error) {
      emailLogger.error("Erreur envoi notifications paiement", {
        error: error.message,
        student: studentData.full_name,
        payment: paymentData
      });
    }
  }


  async statusConfirmPayment(studentData, paymentData) {
    const formattedDate = this.formatDate(new Date());
    
    try {
      // Notification à l'étudiant
      await sendMail({
        to: studentData.email,
        subject: "Paiement",
        html: paymentNotification({
          studentName: studentData.full_name,
          amount: paymentData.amount,
          reference: paymentData.reference,
          formattedDate: formattedDate,
          type: paymentData.type || "paiement"
        }),
      });

      // Notification aux administrateurs
      await sendMail({
        to: this.adminEmails,
        subject: "Nouveau paiement uploadé - LumiLynk",
        html: adminNotification({
          studentName: studentData.full_name,
          studentEmail: studentData.email,
          action: "Nouveau paiement uploadé",
          details: `L'étudiant ${studentData.full_name} a uploadé un paiement de ${paymentData.amount} FCFA (Référence: ${paymentData.reference}). Le fichier de preuve est disponible pour vérification.`,
          formattedDate: formattedDate
        }),
      });

      emailLogger.success(`Notifications de paiement envoyées pour ${studentData.full_name}`, {
        student: studentData.full_name,
        amount: paymentData.amount,
        reference: paymentData.reference
      });
    } catch (error) {
      emailLogger.error("Erreur envoi notifications paiement", {
        error: error.message,
        student: studentData.full_name,
        payment: paymentData
      });
    }
  }

  /**
   * Envoie une notification de document uploadé
   */
  async sendDocumentUploadNotification(studentData, documentData) {
    const formattedDate = this.formatDate(new Date());
    
    try {
      // Notification à l'étudiant
      await sendMail({
        to: studentData.email,
        bcc: this.adminEmails,
        subject: "Confirmation de réception de document",
        html: documentUploadNotification({
          studentName: studentData.full_name,
          documentType: documentData.type,
          formattedDate: formattedDate
        }),
      });

      // Notification aux administrateurs
      await sendMail({
        to: this.adminEmails,
        subject: "Nouveau document uploadé - LumiLynk",
        html: adminNotification({
          studentName: studentData.full_name,
          studentEmail: studentData.email,
          action: "Nouveau document uploadé",
          details: `L'étudiant ${studentData.full_name} a uploadé un document de type "${documentData.type}" (${documentData.filename}). Le document est en attente de vérification.`,
          formattedDate: formattedDate
        }),
      });

      emailLogger.success(`Notifications de document envoyées pour ${studentData.full_name}`, {
        student: studentData.full_name,
        documentType: documentData.type,
        filename: documentData.filename
      });
    } catch (error) {
      emailLogger.error("Erreur envoi notifications document", {
        error: error.message,
        student: studentData.full_name,
        document: documentData
      });
    }
  }

  /**
   * Envoie une notification de changement de statut
   */
  async sendStatusUpdateNotification(studentData, itemData, newStatus) {
    const formattedDate = this.formatDate(new Date());
    
    try {
      await sendMail({
        to: studentData.email,
        subject: `Mise à jour du statut de votre ${itemData.type} - ${itemData.name}`,
        html: statusUpdateNotification({
          studentName: studentData.full_name,
          itemType: itemData.type,
          itemName: itemData.name,
          newStatus: newStatus,
          formattedDate: formattedDate,
          details: itemData.details || `Votre ${itemData.type} a été ${newStatus.toLowerCase()}.`
        }),
      });

      emailLogger.success(`Notification de changement de statut envoyée pour ${studentData.full_name}`, {
        student: studentData.full_name,
        itemType: itemData.type,
        newStatus: newStatus
      });
    } catch (error) {
      emailLogger.error("Erreur envoi notification statut", {
        error: error.message,
        student: studentData.full_name,
        item: itemData
      });
    }
  }

  /**
   * Envoie une notification personnalisée aux administrateurs
   */
  async sendAdminNotification(action, studentData, details) {
    const formattedDate = this.formatDate(new Date());
    
    try {
      await sendMail({
        to: this.adminEmails,
        subject: `${action} - LumiLynk`,
        html: adminNotification({
          studentName: studentData.full_name,
          studentEmail: studentData.email,
          action: action,
          details: details,
          formattedDate: formattedDate
        }),
      });

      emailLogger.success(`Notification admin envoyée: ${action}`, {
        action: action,
        student: studentData.full_name
      });
    } catch (error) {
      emailLogger.error("Erreur envoi notification admin", {
        error: error.message,
        action: action,
        student: studentData.full_name
      });
    }
  }

  /**
   * Envoie une notification de création d'application
   */
  async sendApplicationCreatedNotification(studentData, applicationData) {
    const formattedDate = this.formatDate(new Date());
    
    try {
      // Notification à l'étudiant
      await sendMail({
        to: studentData.email,
        subject: "LumiLynk - Candidature reçue avec succès",
        html: applicationCreatedNotification({
          studentName: studentData.full_name,
          fieldName: applicationData.fieldName,
          levelName: applicationData.levelName,
          formattedDate: formattedDate
        }),
      });

      // Notification aux administrateurs
      await sendMail({
        to: this.adminEmails,
        subject: "Nouvelle candidature créée - LumiLynk",
        html: adminNotification({
          studentName: studentData.full_name,
          studentEmail: studentData.email,
          action: "Nouvelle candidature créée",
          details: `L'étudiant ${studentData.full_name} a créé une nouvelle candidature pour ${applicationData.fieldName} - ${applicationData.levelName}. La candidature est maintenant en attente de traitement.`,
          formattedDate: formattedDate
        }),
      });

      emailLogger.success(`Notifications de candidature envoyées pour ${studentData.full_name}`, {
        student: studentData.full_name,
        field: applicationData.fieldName,
        level: applicationData.levelName
      });
    } catch (error) {
      emailLogger.error("Erreur envoi notifications candidature", {
        error: error.message,
        student: studentData.full_name,
        field: applicationData.fieldName
      });
      throw error;
    }
  }

  /**
   * Envoie un email de bienvenue aux nouveaux utilisateurs
   */
  async sendWelcomeEmail(userData) {
    const formattedDate = this.formatDate(new Date());
    
    try {
      // Email de bienvenue à l'utilisateur
      await sendMail({
        to: userData.email,
        subject: "Bienvenue chez LumiLynk - Votre parcours commence ici !",
        html: welcomeEmail({
          studentName: userData.full_name,
          formattedDate: formattedDate
        }),
      });

      // Notification aux administrateurs
      await sendMail({
        to: this.adminEmails,
        subject: "LumiLynk - Nouvel utilisateur inscrit",
        html: adminNotification({
          studentName: userData.full_name,
          studentEmail: userData.email,
          action: "Nouvel utilisateur inscrit",
          details: `Un nouvel utilisateur s'est inscrit sur la plateforme LumiLynk. Nom: ${userData.full_name}, Email: ${userData.email}, Téléphone: ${userData.phone || 'Non renseigné'}.`,
          formattedDate: formattedDate
        }),
      });

      emailLogger.success(`Email de bienvenue envoyé à ${userData.full_name}`, {
        user: userData.full_name,
        email: userData.email
      });
    } catch (error) {
      emailLogger.error("Erreur envoi email de bienvenue", {
        error: error.message,
        user: userData.full_name,
        email: userData.email
      });
    }
  }

async sendStatusUpdated(studentData, newStatus) {
  const formattedDate = this.formatDate(new Date());

  try {
    await sendMail({
      to: studentData.email,
      subject: `LumiLynk - Mise à jour du statut de votre dossier : ${newStatus}`,
      html: statusUpdateNotification({
        studentName: studentData.full_name,
        newStatus: newStatus,
        formattedDate: formattedDate,
      }),
    });
  } catch (error) {
    emailLogger.error("Erreur envoi notification de mise à jour de statut", {
      error: error.message,
      user: studentData.full_name,
      email: studentData.email
    });
  }
}

  /**
   * Formate une date en français
   */
  formatDate(date) {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  }
}

module.exports = new EmailService();
