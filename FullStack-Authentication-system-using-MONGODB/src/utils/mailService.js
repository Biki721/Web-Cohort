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

const sendMail = async (email, token) => {
  const mailOption = {
    from: process.env.MAILTRAP_SENDEREMAIL,
    to: email,
    subject: "Verify your email", // Subject line
    html: `<p>Please click on the following link: </p>
          <a href="${process.env.FRONTEND_BASE_URL}/api/v1/users/verify/${token}">
        Verify Email
      </a>
          `,
  };

  await transporter.sendMail(mailOption);
};

export default sendMail;
