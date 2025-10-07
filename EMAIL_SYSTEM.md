# Système d'Emails Automatisés - LumiLynk

## Vue d'ensemble

Le système d'emails automatisés de LumiLynk envoie des notifications automatiques aux étudiants et aux administrateurs lors de différents événements dans l'application.

## Fonctionnalités

### 📧 Notifications Automatiques

#### Pour les Étudiants
- **Inscription** : Email de bienvenue avec guide des prochaines étapes
- **Connexion** : Notification de sécurité lors de chaque connexion (optionnel)
- **Upload de paiement** : Confirmation de réception avec détails du paiement
- **Upload de document** : Confirmation de réception avec type de document
- **Changement de statut** : Notification lors de la mise à jour du statut d'un document ou paiement

#### Pour les Administrateurs
- **Nouvel utilisateur** : Notification immédiate lors de l'inscription d'un nouvel utilisateur
- **Nouveau paiement** : Notification immédiate avec détails de l'étudiant et du paiement
- **Nouveau document** : Notification immédiate avec type de document et informations étudiant
- **Toutes les actions** : Copie cachée (BCC) de tous les emails envoyés aux étudiants

## Structure des Fichiers

```
backend/
├── tempates/emails/
│   ├── welcomeEmail.js                 # Template d'email de bienvenue
│   ├── loginNotification.js            # Template de notification de connexion
│   ├── paymentNotification.js          # Template pour notifications de paiement
│   ├── documentUploadNotification.js   # Template pour notifications de document
│   ├── statusUpdateNotification.js     # Template pour changements de statut
│   ├── adminNotification.js            # Template pour notifications admin
│   ├── Letters.js                      # Template pour lettres (existant)
│   └── accuseRep.js                    # Template d'accusé de réception (existant)
├── services/
│   └── emailService.js                 # Service centralisé pour l'envoi d'emails
├── utils/
│   ├── mailer.js                       # Configuration Nodemailer (existant)
│   └── emailLogger.js                  # Logger pour les emails
├── config/
│   └── emailConfig.js                  # Configuration des emails
└── logs/
    └── email.log                       # Logs des envois d'emails
```

## Templates d'Emails

### 1. Email de Bienvenue (`welcomeEmail.js`)
- **Déclencheur** : Inscription d'un nouvel utilisateur
- **Destinataires** : Nouvel utilisateur + Administrateurs (BCC)
- **Contenu** : Message de bienvenue, guide des prochaines étapes, liens utiles

### 2. Notification de Connexion (`loginNotification.js`)
- **Déclencheur** : Connexion d'un utilisateur (optionnel)
- **Destinataires** : Utilisateur uniquement
- **Contenu** : Heure de connexion, adresse IP, informations de sécurité

### 3. Notification de Paiement (`paymentNotification.js`)
- **Déclencheur** : Upload d'un paiement
- **Destinataires** : Étudiant + Administrateurs (BCC)
- **Contenu** : Montant, référence, type de paiement

### 4. Notification de Document (`documentUploadNotification.js`)
- **Déclencheur** : Upload d'un document
- **Destinataires** : Étudiant + Administrateurs (BCC)
- **Contenu** : Type de document, nom du fichier

### 5. Notification de Changement de Statut (`statusUpdateNotification.js`)
- **Déclencheur** : Mise à jour du statut d'un document ou paiement
- **Destinataires** : Étudiant + Administrateurs (BCC)
- **Contenu** : Nouveau statut, détails de l'élément

### 6. Notification Administrateur (`adminNotification.js`)
- **Déclencheur** : Toute action nécessitant une attention admin
- **Destinataires** : Administrateurs uniquement
- **Contenu** : Résumé de l'action, détails de l'étudiant

## Service d'Email (`emailService.js`)

Le service centralisé gère tous les envois d'emails avec :

### Méthodes Principales
- `sendWelcomeEmail()` : Email de bienvenue pour nouveaux utilisateurs
- `sendLoginNotification()` : Notification de connexion (optionnel)
- `sendPaymentUploadNotification()` : Notification d'upload de paiement
- `sendDocumentUploadNotification()` : Notification d'upload de document
- `sendStatusUpdateNotification()` : Notification de changement de statut
- `sendAdminNotification()` : Notification personnalisée aux admins

### Fonctionnalités
- ✅ Gestion centralisée des emails d'administration
- ✅ Logging automatique de tous les envois
- ✅ Gestion d'erreurs robuste
- ✅ Formatage automatique des dates en français

## Configuration

### Variables d'Environnement Requises
```env
MAIL_USER=votre-email@domain.com
MAIL_PASS=votre-mot-de-passe
```

### Emails d'Administration
Les emails d'administration sont configurés dans `emailService.js` :
```javascript
this.adminEmails = "nabankader12@gmail.com, urielsoro@gmail.com";
```

## Logging

Tous les envois d'emails sont loggés dans `logs/email.log` avec :
- Timestamp de l'envoi
- Niveau de log (INFO, SUCCESS, WARN, ERROR)
- Détails de l'email envoyé
- Informations sur l'étudiant concerné

## Événements Déclencheurs

### Inscription d'Utilisateur
1. Nouvel utilisateur s'inscrit avec email, nom, téléphone
2. Système enregistre l'utilisateur en base
3. Envoi automatique de 2 emails :
   - Email de bienvenue à l'utilisateur
   - Notification aux administrateurs

### Connexion d'Utilisateur (Optionnel)
1. Utilisateur se connecte avec email/mot de passe
2. Système génère un token JWT
3. Envoi automatique d'1 email :
   - Notification de sécurité à l'utilisateur

### Upload de Paiement
1. Étudiant upload un fichier de preuve de paiement
2. Système enregistre le paiement en base
3. Envoi automatique de 2 emails :
   - Confirmation à l'étudiant
   - Notification aux administrateurs

### Upload de Document
1. Étudiant upload un document
2. Système enregistre le document en base
3. Envoi automatique de 2 emails :
   - Confirmation à l'étudiant
   - Notification aux administrateurs

### Changement de Statut
1. Administrateur met à jour le statut d'un document/paiement
2. Envoi automatique d'un email à l'étudiant avec le nouveau statut

## Utilisation

### Dans les Contrôleurs
```javascript
const emailService = require('../services/emailService');

// Après l'inscription d'un utilisateur
await emailService.sendWelcomeEmail(userData);

// Après la connexion d'un utilisateur (optionnel)
await emailService.sendLoginNotification(userData, loginInfo);

// Après un upload de paiement
await emailService.sendPaymentUploadNotification(studentData, paymentData);

// Après un upload de document
await emailService.sendDocumentUploadNotification(studentData, documentData);

// Après un changement de statut
await emailService.sendStatusUpdateNotification(studentData, itemData, newStatus);
```

## Monitoring

### Vérifier les Logs
```bash
tail -f logs/email.log
```

### Vérifier les Erreurs
```bash
grep "ERROR" logs/email.log
```

## Maintenance

### Ajouter un Nouveau Type de Notification
1. Créer un nouveau template dans `tempates/emails/`
2. Ajouter une méthode dans `emailService.js`
3. Intégrer dans le contrôleur approprié

### Modifier les Emails d'Administration
Éditer la propriété `adminEmails` dans `emailService.js`

## Sécurité

- ✅ Validation des données avant envoi
- ✅ Gestion d'erreurs pour éviter les fuites d'informations
- ✅ Logging sécurisé sans données sensibles
- ✅ Configuration centralisée des destinataires

## Support

Pour toute question ou problème avec le système d'emails, vérifier :
1. Les logs dans `logs/email.log`
2. La configuration SMTP dans `utils/mailer.js`
3. Les variables d'environnement
4. La connectivité réseau du serveur
