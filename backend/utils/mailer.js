const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // gunakan App Password Gmail, bukan password biasa
  },
});

/**
 * Kirim email reset password ke user
 * @param {string} toEmail - email tujuan
 * @param {string} resetLink - link reset password lengkap dengan token
 */
async function sendResetPasswordEmail(toEmail, resetLink) {
  const mailOptions = {
    from: `"Zenvy Apparel" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Reset Password Akun Zenvy Apparel',
    html: `
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
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendResetPasswordEmail };
