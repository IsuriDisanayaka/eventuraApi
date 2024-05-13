require("dotenv").config();
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

const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: emailUser,
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
