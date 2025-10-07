module.exports = function notification({ name, email, phone, subject, message }) {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h2 style="color: #4f46e5; margin-bottom: 20px;"> Nouveau message reçu</h2>
            
            <p style="font-size: 14px; color: #333;"><b>Nom :</b> ${name}</p>
            <p style="font-size: 14px; color: #333;"><b>Email :</b> ${email}</p>
            <p style="font-size: 14px; color: #333;"><b>Téléphone :</b> ${phone || "Non renseigné"}</p>
            <p style="font-size: 14px; color: #333;"><b>Sujet :</b> ${subject || "Non précisé"}</p>
            
            <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-left: 4px solid #4f46e5; border-radius: 4px;">
                <p style="font-size: 14px; color: #111; line-height: 1.5;">${message}</p>
            </div>
            
            <p style="font-size: 12px; color: #888; margin-top: 30px;">— Message envoyé depuis le site LumiLynk 🌍</p>
            </div>
        </div>
    `;
};