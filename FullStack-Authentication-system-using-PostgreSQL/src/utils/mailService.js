import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const sendMail = async (email, emailSubject, emailHtml) => {
  const mailOption = {
    from: process.env.MAILTRAP_SENDEREMAIL,
    to: email,
    subject: emailSubject, // Subject line
    html: emailHtml,
  };

  await transporter.sendMail(mailOption);
};

export default sendMail;
