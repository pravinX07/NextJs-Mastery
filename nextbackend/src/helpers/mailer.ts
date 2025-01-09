import User from "@/models/userModels";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { Html } from "next/document";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    // ToDO configure mail is use
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "21c2a3a79e0a76", // same |
        pass: "********b27f", // sensitive this is in env file
      },
    });

    const mailOptions = {
      from: "pravin@.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html:`<p>Click <a href="${process.env.DOMAIN}/verifyemai?token=${hashedToken}">here</a> to ${emailType === "VERIFY"?"verify your email":"reset your password"}
        or copy and paste the link below in your browser.
        <br> ${process.env.DOMAIN}/veryfyemail?token=${hashedToken}
        </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
