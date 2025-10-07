module.exports = function loginNotification({ studentName, loginTime, ipAddress, deviceInfo }) {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h2 style="color: #4f46e5; margin-bottom: 20px;">🔐 Connexion détectée</h2>
                
                <div style="background: #f3f4f6; padding: 15px; border-left: 4px solid #4f46e5; border-radius: 4px; margin-bottom: 20px;">
                    <p style="font-size: 16px; color: #111; margin: 0; font-weight: bold;">Nouvelle connexion à votre compte LumiLynk</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <p style="font-size: 14px; color: #333; margin: 5px 0;"><b>👤 Utilisateur :</b> ${studentName}</p>
                    <p style="font-size: 14px; color: #333; margin: 5px 0;"><b>🕐 Heure :</b> ${loginTime}</p>
                    <p style="font-size: 14px; color: #333; margin: 5px 0;"><b>🌐 Adresse IP :</b> ${ipAddress}</p>
                    <p style="font-size: 14px; color: #333; margin: 5px 0;"><b>📱 Appareil :</b> ${deviceInfo}</p>
                </div>
                
                <div style="background: #fef3c7; padding: 15px; border-radius: 4px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
                    <p style="font-size: 12px; color: #92400e; margin: 0;">
                        <strong>⚠️ Sécurité :</strong> Si vous n'êtes pas à l'origine de cette connexion, veuillez changer votre mot de passe immédiatement.
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://www.lumilynk.com/login" style="display: inline-block; padding: 10px 20px; background: #4f46e5; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Accéder à mon compte
                    </a>
                </div>
                
                <p style="font-size: 12px; color: #888; margin-top: 30px;">— Notification de sécurité LumiLynk 🔒</p>
            </div>
        </div>
    `;
};
