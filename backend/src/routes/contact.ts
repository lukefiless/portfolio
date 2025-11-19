import express from "express";
import { body, validationResult } from "express-validator";
import {
  sendContactNotification,
  sendContactConfirmation,
} from "../utils/emailService";

const router = express.Router();

// POST /api/contact - Submit contact form
router.post(
  "/",
  [
    body("name").notEmpty().trim().withMessage("Name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("subject").notEmpty().trim().withMessage("Subject is required"),
    body("message").notEmpty().trim().withMessage("Message is required"),
  ],
  async (req: express.Request, res: express.Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const contactData = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
      };

      // Send email notifications
      const emailSent = await sendContactNotification(contactData);

      // Send confirmation email to the person who submitted the form
      await sendContactConfirmation({
        name: contactData.name,
        email: contactData.email,
      });

      if (emailSent) {
        res.status(201).json({
          message: "Message sent successfully!",
        });
      } else {
        res.status(500).json({
          message: "Failed to send email. Please check server configuration.",
        });
      }
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "Error sending message" });
    }
  },
);

export default router;
