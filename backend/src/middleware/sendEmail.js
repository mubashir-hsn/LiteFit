import { transporter } from "./emailConfig.js";

export const sendVerificationCode = async (email, verificationCode) => {
  try {
    if (!email) {
      throw new Error("Recipient email is not provided.");
    }
    if (!verificationCode) {
      throw new Error("Verification code is not provided.");
    }

    const response = await transporter.sendMail({
      from: `"LiteFit 👻" <${process.env.EMAIL}>`, // sender address
      to: email, // list of receivers
      subject: "Email Verification Code", // Subject line
      text: "Verify your email.", // plain text body
      html: `<b>Verify your email by entering this code:</b> <p>${verificationCode}</p>`, // html body
    });
  } catch (error) {
    console.error("Error in sending email:", error.message || error);
  }
};
