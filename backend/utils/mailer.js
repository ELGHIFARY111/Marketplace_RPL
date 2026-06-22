const axios = require('axios');

/**
 * Kirim email reset password ke user menggunakan Brevo API
 * @param {string} toEmail - email tujuan
 * @param {string} resetLink - link reset password lengkap dengan token
 */
async function sendResetPasswordEmail(toEmail, resetLink) {
  const data = {
    sender: { name: "Zenvy Apparel", email: process.env.BREVO_SENDER_EMAIL },
    to: [{ email: toEmail }],
    subject: "Reset Password Akun Zenvy Apparel",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f6f3; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3d2c1e; font-size: 28px; margin: 0;">Zenvy Apparel</h1>
          <p style="color: #888; font-size: 14px; margin-top: 4px;">Reset Password</p>
        </div>

        <div style="background: white; border-radius: 10px; padding: 30px; margin-bottom: 24px;">
          <h2 style="color: #3d2c1e; font-size: 20px; margin-top: 0;">Permintaan Reset Password</h2>
          <p style="color: #555; line-height: 1.6;">
            Kami menerima permintaan untuk mereset password akun Zenvy Apparel kamu.
            Klik tombol di bawah untuk membuat password baru.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}"
               style="background: #b89578; color: white; text-decoration: none; padding: 14px 32px;
                      border-radius: 50px; font-size: 16px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>

          <p style="color: #888; font-size: 13px; margin-bottom: 0;">
            Link ini hanya berlaku selama <strong>1 jam</strong>. 
            Jika kamu tidak merasa meminta reset password, abaikan email ini.
          </p>
        </div>

        <p style="text-align: center; color: #aaa; font-size: 12px; margin: 0;">
          &copy; ${new Date().getFullYear()} Zenvy Apparel. Semua hak dilindungi.
        </p>
      </div>
    `
  };

  await axios.post('https://api.brevo.com/v3/smtp/email', data, {
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json'
    }
  });
}

module.exports = { sendResetPasswordEmail };
