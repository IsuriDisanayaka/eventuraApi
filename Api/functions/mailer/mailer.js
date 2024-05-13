const nodemailer = require("nodemailer");
const functions = require("firebase-functions");

const emailUser = functions.config().eventura.email_user;
const emailPassword = functions.config().eventura.email_password;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: emailUser,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail;
