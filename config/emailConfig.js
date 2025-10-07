module.exports = {
  // Emails des administrateurs qui recevront les notifications
  adminEmails: [
    "nabankader12@gmail.com",
    "urielsoro@gmail.com"
  ],
  
  // Configuration des types de notifications
  notificationTypes: {
    PAYMENT_UPLOAD: "Nouveau paiement uploadé",
    DOCUMENT_UPLOAD: "Nouveau document uploadé",
    STATUS_UPDATE: "Mise à jour de statut",
    APPLICATION_SUBMITTED: "Nouvelle candidature soumise",
    APPLICATION_APPROVED: "Candidature approuvée",
    APPLICATION_REJECTED: "Candidature rejetée"
  },
  
  // Templates d'emails disponibles
  emailTemplates: {
    PAYMENT_NOTIFICATION: "paymentNotification",
    DOCUMENT_NOTIFICATION: "documentUploadNotification",
    STATUS_UPDATE: "statusUpdateNotification",
    ADMIN_NOTIFICATION: "adminNotification",
    LETTER_NOTIFICATION: "Letters",
    ACKNOWLEDGMENT: "accuseRep"
  }
};
