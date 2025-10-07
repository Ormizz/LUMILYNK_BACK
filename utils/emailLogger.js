const fs = require('fs');
const path = require('path');

class EmailLogger {
  constructor() {
    this.logFile = path.join(__dirname, '../logs/email.log');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data
    };

    const logLine = JSON.stringify(logEntry) + '\n';
    
    try {
      fs.appendFileSync(this.logFile, logLine);
    } catch (error) {
      console.error('Erreur lors de l\'écriture du log email:', error);
    }

    // Afficher dans la console selon le niveau
    switch (level) {
      case 'ERROR':
        console.error(`[EMAIL ERROR] ${message}`, data);
        break;
      case 'WARN':
        console.warn(`[EMAIL WARN] ${message}`, data);
        break;
      case 'INFO':
        console.log(`[EMAIL INFO] ${message}`, data);
        break;
      default:
        console.log(`[EMAIL] ${message}`, data);
    }
  }

  info(message, data) {
    this.log('INFO', message, data);
  }

  warn(message, data) {
    this.log('WARN', message, data);
  }

  error(message, data) {
    this.log('ERROR', message, data);
  }

  success(message, data) {
    this.log('SUCCESS', message, data);
  }
}

module.exports = new EmailLogger();
