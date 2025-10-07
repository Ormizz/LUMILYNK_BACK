module.exports = function welcomeEmail({ studentName, formattedDate }) {
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
                            <td style="padding:20px;background-image:url('https://fvtnuav.stripocdn.email/content/guids/CABINET_a82aef5be178574d276132abed656b7098f4a6283b7a7945e45077bbe241909e/images/favicon.png');background-repeat:no-repeat;background-position:center; background-size:45%;">
                              <h3 style="margin:0;font-family:Arial, Helvetica, sans-serif;font-size:24px;font-weight:bold;line-height:28px;color:#319bd7;">Bienvenue chez LumiLynk, ${studentName} !</h3>
                              
                              <div style="margin:20px 0; padding:20px;">
                                <p style="margin:0 0 15px 0;font-family:Arial, Helvetica, sans-serif;font-size:16px;color:#111;font-weight:bold;">
                                  Votre compte a été créé avec succès !
                                </p>
                                <p style="margin:0;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#374151;line-height:1.6;">
                                  Vous pouvez maintenant commencer votre parcours vers les meilleures universités du monde.
                                </p>
                              </div>

                              <div style="margin:25px 0;">
                                <h4 style="margin:0 0 15px 0;font-family:Arial, Helvetica, sans-serif;font-size:18px;color:#319bd7;">Prochaines étapes :</h4>
                                
                                <div style="margin:10px 0; padding:12px; ">
                                  <p style="margin:0;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#111;font-weight:bold;">1. Complétez votre profil</p>
                                  <p style="margin:5px 0 0 0;font-family:Arial, Helvetica, sans-serif;font-size:13px;color:#000;">Ajoutez vos informations personnelles et académiques</p>
                                </div>
                                
                                <div style="margin:10px 0; padding:12px; ">
                                  <p style="margin:0;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#111;font-weight:bold;">2. Soumettez votre candidature</p>
                                  <p style="margin:5px 0 0 0;font-family:Arial, Helvetica, sans-serif;font-size:13px;color:#000;">Choisissez vos universités et programmes d'études</p>
                                </div>
                                
                                <div style="margin:10px 0; padding:12px; ">
                                  <p style="margin:0;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#111;font-weight:bold;">3. Uploadez vos documents</p>
                                  <p style="margin:5px 0 0 0;font-family:Arial, Helvetica, sans-serif;font-size:13px;color:#000;">Pièce d'identité, diplômes, relevés de notes, etc.</p>
                                </div>
                                
                                <div style="margin:10px 0; padding:12px; ">
                                  <p style="margin:0;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#111;font-weight:bold;">4. Effectuez vos paiements</p>
                                  <p style="margin:5px 0 0 0;font-family:Arial, Helvetica, sans-serif;font-size:13px;color:#000;">Frais de candidature et autres paiements requis</p>
                                </div>
                              </div>

                              <div style="margin:25px 0; text-align:center;">
                                <a href="https://www.lumilynk.com/connexion" style="display:inline-block; padding:12px 24px; background:#319bd7; color:#ffffff; text-decoration:none; border-radius:6px; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold;">
                                  Accéder à mon espace
                                </a>
                              </div>

                              <p style="margin:15px 0 0 0;font-family:Arial, Helvetica, sans-serif;line-height:21px;font-size:14px;color:#333;">
                                Si vous avez des questions, n'hésitez pas à nous contacter. Notre équipe est là pour vous accompagner dans votre parcours d'études à l'étranger.
                                <br><br>
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
