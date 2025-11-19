/**
 * EMAIL SERVICE UTILITY
 *
 * This service handles sending emails for contact form notifications.
 * It uses Nodemailer with Gmail SMTP for reliable email delivery.
 *
 * Features:
 * - Contact form notifications
 * - Gmail SMTP integration
 * - HTML email templates
 * - Error handling
 *
 * Setup Required:
 * - Enable 2-factor authentication on Gmail
 * - Generate an App Password
 * - Add credentials to .env file
 */

import nodemailer from "nodemailer";

// Email configuration
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error(
      "EMAIL_USER and EMAIL_PASSWORD must be set in environment variables"
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
    },
  });
};

// Send contact form notification email
export const sendContactNotification = async (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "lukedfiles@gmail.com",
      subject: `lukefiles.dev / ${contactData.name} / ${contactData.subject}`,
      text: `${contactData.message}\n\n${contactData.email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; white-space: pre-wrap;">
          ${contactData.message.replace(/\n/g, "<br>")}
          <br><br>
          ${contactData.email}
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Contact notification email sent successfully");
    return true;
  } catch (error: any) {
    console.error("Error sending contact notification email:", error);
    if (error.code === "EAUTH") {
      console.error(
        "Authentication failed. Make sure you're using a Gmail App Password, not your regular password."
      );
    } else if (error.code === "EENVELOPE") {
      console.error("Invalid email address in from/to fields");
    } else {
      console.error("Error details:", error.message || error);
    }
    return false;
  }
};

// Send welcome email to contact form submitter
export const sendContactConfirmation = async (contactData: {
  name: string;
  email: string;
}) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for reaching out!</h2>
          <p>Hi ${contactData.name},</p>
          <p>Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Your Name</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Contact confirmation email sent successfully");
    return true;
  } catch (error: any) {
    console.error("Error sending contact confirmation email:", error);
    if (error.code === "EAUTH") {
      console.error(
        "Authentication failed. Make sure you're using a Gmail App Password, not your regular password."
      );
    } else if (error.code === "EENVELOPE") {
      console.error("Invalid email address in from/to fields");
    } else {
      console.error("Error details:", error.message || error);
    }
    return false;
  }
};
