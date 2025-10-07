module.exports = function paymentconfirmation({ studentName, amount, reference, formattedDate, status, type = "paiement" }) {

  if (type === "admission_letter")
    type = "lettre d'admission"
  else
    type = "lettre d'offre"
  if (status === "refuse")
    status = "refusé"
  else if (status === "valide")
    status = "accepté"
  return `
    <body style="width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;background-color:#FAFAFA;">
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Confirmation de votre paiement</title>
    </head>
    <body style="margin:0; padding:0; background-color:#FAFAFA; font-family:Arial, Helvetica, sans-serif;">
      <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; background-color:#FAFAFA;">
        <tr>
          <td align="center">
            
            <!-- HEADER -->
            <table width="600" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" style="border-collapse:collapse;">
              <tr>
                <td align="center" style="padding:10px 20px;">
                  <img src="https://fvtnuav.stripocdn.email/content/guids/CABINET_a82aef5be178574d276132abed656b7098f4a6283b7a7945e45077bbe241909e/images/logoprincipal.png" 
                      alt="Logo LumiLynk" width="560" style="display:block; max-width:100%; border:0; outline:none; text-decoration:none;">
                </td>
              </tr>
            </table>

            <!-- CONTENT -->
            <table width="600" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" style="border-collapse:collapse; border-top:10px dashed #319bd7; border-bottom:10px dashed #319bd7;">
              <tr>
                <td style="padding:20px;">
                  <p style="margin:0; font-size:14px; color:#666;">${formattedDate}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:20px;" align="left">
                  <h3 style="margin:0; font-size:20px; font-weight:bold; color:#319bd7;">
                    Bonjour ${studentName},
                  </h3>

                  <p style="margin:20px 0 0 0; font-size:15px; color:#333; line-height:22px;">
                    Le paiement de votre <strong>${type}</strong> d’un montant de
                    <strong>${amount} XOF</strong> avec la référence <strong>${reference}</strong> est <strong>${status}</strong>.
                  </p>

                  <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px; border:1px solid #ddd; box-shadow:0px 4px 10px rgba(0,0,0,0.1);">
                    <tr>
                      <td style="padding:15px;">
                        <p style="margin:0; font-size:16px; color:#111; font-weight:bold;">
                          Détails du paiement :
                        </p>
                        <p style="margin:5px 0 0 0; font-size:14px; color:#374151;">
                          Montant : <span style="font-weight:bold; color:#319bd7;">${amount} XOF</span><br>
                          Référence : <span style="font-weight:bold; color:#319bd7;">${reference}</span><br>
                          Date : <span style="font-weight:bold; color:#319bd7;">${formattedDate}</span>
                        </p>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:15px 0 0 0; font-size:14px; color:#333; line-height:21px;">
                    Merci pour votre confiance. Vous pouvez suivre l’état de votre dossier
                    à tout moment depuis votre espace étudiant LumiLynk.
                  </p>

                  <p style="margin:15px 0 0 0; font-size:14px; color:#333;">
                    Cordialement,<br>
                    <strong>L’équipe LumiLynk</strong>
                  </p>
                </td>
              </tr>
            </table>

            <!-- FOOTER -->
            <table width="600" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" style="border-collapse:collapse; margin-top:10px;">
              <tr>
                <td align="center" style="padding:20px;">
                  <h3 style="margin:0; font-size:20px; font-weight:bold; color:#319bd7;">LUMILYNK</h3>
                  <p style="margin:5px 0; font-size:14px; color:#333;">Votre passerelle vers les meilleures universités.</p>
                  <p style="margin:5px 0; font-size:14px; color:#333;">
                    <a href="https://www.lumilynk.com" target="_blank" style="color:#6fa8dc; text-decoration:underline;">www.lumilynk.com</a>
                  </p>
                  <p style="margin:5px 0; font-size:14px; color:#333;">
                    <a href="tel:+919041378984" style="color:#6fa8dc; text-decoration:none;">+91 9041378984</a> /
                    <a href="tel:+919056820845" style="color:#6fa8dc; text-decoration:none;">+91 9056820845</a>
                  </p>
                  <div style="margin-top:10px;">
                    <a href="https://www.facebook.com/profile.php?id=61578165950712" target="_blank" style="margin-right:10px;">
                      <img src="https://fvtnuav.stripocdn.email/content/assets/img/social-icons/logo-colored/facebook-logo-colored.png" width="30" height="30" style="border:0; display:inline-block;">
                    </a>
                    <a href="https://www.instagram.com/lumilynk_2025/" target="_blank" style="margin-right:10px;">
                      <img src="https://fvtnuav.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" width="30" height="30" style="border:0; display:inline-block;">
                    </a>
                    <a href="https://wa.me/919041378984" target="_blank">
                      <img src="https://fvtnuav.stripocdn.email/content/assets/img/messenger-icons/logo-colored/whatsapp-logo-colored.png" width="30" height="30" style="border:0; display:inline-block;">
                    </a>
                  </div>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
