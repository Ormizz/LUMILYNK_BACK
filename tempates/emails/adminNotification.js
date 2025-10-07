module.exports = function adminNotification({ studentName, studentEmail, action, details, formattedDate }) {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h2 style="color: #4f46e5; margin-bottom: 20px;">Notification Administrateur</h2>
                
                <div style="background: #f3f4f6; padding: 15px; border-left: 4px solid #4f46e5; border-radius: 4px; margin-bottom: 20px;">
                    <p style="font-size: 16px; color: #111; margin: 0; font-weight: bold;">${action}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <p style="font-size: 14px; color: #333; margin: 5px 0;"><b>Étudiant :</b> ${studentName}</p>
                    <p style="font-size: 14px; color: #333; margin: 5px 0;"><b>Email :</b> ${studentEmail}</p>
                    <p style="font-size: 14px; color: #333; margin: 5px 0;"><b>Date :</b> ${formattedDate}</p>
                </div>
                
                <div style="background: #f8fafc; padding: 15px; border-radius: 4px; border: 1px solid #e2e8f0;">
                    <h4 style="margin: 0 0 10px 0; color: #374151; font-size: 14px;">Détails :</h4>
                    <p style="font-size: 14px; color: #111; line-height: 1.5; margin: 0;">${details}</p>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 4px; border-left: 4px solid #f59e0b;">
                    <p style="font-size: 12px; color: #92400e; margin: 0;">
                        <strong>Action requise :</strong> Veuillez vérifier et traiter cette demande dans l'interface d'administration.
                    </p>
                </div>
                
                <p style="font-size: 12px; color: #888; margin-top: 30px;">— Notification automatique LumiLynk 🌍</p>
            </div>
        </div>
    `;
};
