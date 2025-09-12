import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config(); // loads .env

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Send FCM push notification
app.post("/send-reminders", async (req, res) => {
  try {
    const { token, title, body } = req.body;

    if (!token) {
      return res.status(400).json({ error: "FCM token is required" });
    }

    // Build notification payload
    const message = {
      to: token,
      notification: {
        title: title || "Task Reminder",
        body: body || "You have a pending task to complete!",
      },
    };

    // Send to FCM
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: `key=${process.env.FCM_SERVER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();

    res.json({ success: true, fcm_response: data });
  } catch (err) {
    console.error("Error sending FCM:", err);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend listening on port ${PORT}`));
