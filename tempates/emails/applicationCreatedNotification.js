/**
 * Template d'email pour notification de création d'application
 * @param {Object} data - Données pour le template
 * @param {string} data.studentName - Nom complet de l'étudiant
 * @param {string} data.fieldName - Nom du domaine d'étude
 * @param {string} data.levelName - Nom du niveau d'étude
 * @param {string} data.formattedDate - Date formatée
 * @returns {string} HTML de l'email
 */
module.exports = ({ studentName, fieldName, levelName, formattedDate }) => {
  return `
    <body style="width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;background-color:#FAFAFA;">
      <div style="background-color:#FAFAFA;">
        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;height:100%;background-color:#FAFAFA;">
          <tr>
            <td>
              <!-- HEADER -->
              <table cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;width:100%;background-color:transparent;">
                <tr>
                  <td align="center">
                    <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="border-collapse:collapse;background-color:transparent;width:600px;">
                      <tr>
                        <td align="center" style="padding:10px 20px;">
                          <img src="https://fvtnuav.stripocdn.email/content/guids/CABINET_a82aef5be178574d276132abed656b7098f4a6283b7a7945e45077bbe241909e/images/logoprincipal.png" alt="Logo" width="560" style="display:block;width:560px;max-width:100%;border:0;outline:none;text-decoration:none;margin:0;">
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CONTENT -->
              <table cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;width:100%;">
                <tr>
                  <td align="center">
                    <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="border-collapse:collapse;background-color:#FFFFFF;border-top:10px dashed #319bd7;border-bottom:10px dashed #319bd7;width:600px;">
                      <tr>
                        <td style="padding:30px 20px 0 20px;">
                          <p style="margin:0;font-family:Arial, Helvetica, sans-serif;line-height:21px;font-size:14px;color:#666;">${formattedDate}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:20px;background-repeat:no-repeat;background-position:center;background-size:45%;">
                          <h2 style="margin:0;font-family:Arial, Helvetica, sans-serif;font-size:22px;font-weight:bold;line-height:28px;color:#28a745;text-align:center;">
                            🎓 Candidature reçue avec succès !
                          </h2>
                          <p style="margin:20px 0 0 0;font-family:Arial, Helvetica, sans-serif;line-height:22px;font-size:15px;color:#333;">
                            Bonjour <strong>${studentName}</strong>,<br><br>
                            Nous avons le plaisir de vous confirmer que votre candidature a été <strong>reçue avec succès</strong> dans nos systèmes.
                          </p>
                          <div style="background-color:#e7f3ff;padding:15px;border-left:4px solid #007bff;margin:20px 0;border-radius:5px;">
                            <p style="margin:0;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#333;">
                              🎉 <strong>Félicitations !</strong> Vous venez de franchir la première étape vers votre projet d'études à l'étranger.
                            </p>
                          </div>

                          <!-- INFO BOX -->
                          <div style="background-color:#f8f9fa;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #dee2e6;">
                            <h3 style="margin:0 0 15px 0;font-family:Arial, Helvetica, sans-serif;font-size:18px;color:#319bd7;">Détails de votre candidature</h3>
                            <p style="margin:5px 0;font-size:14px;"><strong>Candidat :</strong> ${studentName}</p>
                            <p style="margin:5px 0;font-size:14px;"><strong>Domaine d'étude :</strong> ${fieldName}</p>
                            <p style="margin:5px 0;font-size:14px;"><strong>Niveau :</strong> ${levelName}</p>
                            <p style="margin:5px 0;font-size:14px;"><strong>Date de soumission :</strong> ${formattedDate}</p>
                          </div>

                          <!-- NEXT STEPS -->
                          <div style="background-color:#fff3cd;border:1px solid #ffeaa7;border-radius:8px;padding:20px;margin:25px 0;">
                            <h3 style="color:#856404;margin-top:0;margin-bottom:15px;font-family:Arial, Helvetica, sans-serif;font-size:16px;">Prochaines étapes</h3>
                            <ul style="padding-left:20px;margin:0;font-size:14px;color:#333;font-family:Arial, Helvetica, sans-serif;">
                              <li>Notre équipe va examiner votre candidature dans les plus brefs délais</li>
                              <li>Vous recevrez un email de notre part sous 24-48h avec les détails de la suite du processus</li>
                              <li>Restez attentif à vos emails pour ne manquer aucune communication importante</li>
                            </ul>
                          </div>

                          <p style="margin:15px 0 0 0;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#333;">
                            Cordialement,<br> L'équipe LumiLynk.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- FOOTER -->
              <table cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;width:100%;">
                <tr>
                  <td align="center">
                    <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="border-collapse:collapse;background-color:#FFFFFF;width:600px;">
                      <tr>
                        <td style="padding:20px;text-align:center;">
                          <h3 style="margin:0;font-family:Arial, Helvetica, sans-serif;font-size:20px;font-weight:bold;line-height:30px;color:#319bd7;">LUMILYNK</h3>
                          <p style="margin:5px 0 0 0;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#333;line-height:21px;">Votre passerelle vers les meilleures universités.</p>
                          <p style="margin:5px 0 0 0;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#333;line-height:21px;"><a href="https://www.lumilynk.com" target="_blank" style="color:#6fa8dc;text-decoration:underline;">www.lumilynk.com</a></p>
                          <p style="margin:5px 0 0 0;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#333;line-height:21px;">
                            <a href="tel:+919041378984" style="color:#6fa8dc;text-decoration:none;">+91 9041378984</a> /
                            <a href="tel:+919056820845" style="color:#6fa8dc;text-decoration:underline;">+91 9056820845</a>
                          </p>
                          <div style="margin-top:10px;">
                            <a href="https://www.facebook.com/profile.php?id=61578165950712" target="_blank" style="margin-right:10px;"><img src="https://fvtnuav.stripocdn.email/content/assets/img/social-icons/logo-colored/facebook-logo-colored.png" width="30" height="30" style="border:0;display:inline-block;"></a>
                            <a href="https://www.instagram.com/lumilynk_2025/" target="_blank" style="margin-right:10px;"><img src="https://fvtnuav.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" width="30" height="30" style="border:0;display:inline-block;"></a>
                            <a href="https://wa.me/919041378984" target="_blank"><img src="https://fvtnuav.stripocdn.email/content/assets/img/messenger-icons/logo-colored/whatsapp-logo-colored.png" width="30" height="30" style="border:0;display:inline-block;"></a>
                          </div>
                          <p style="font-size:12px;color:#999;margin-top:20px;">
                            Cet email a été envoyé automatiquement le ${formattedDate}.<br>
                            © 2024 LumiLynk - Tous droits réservés
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  `;
};