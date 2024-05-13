const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors");

const express = require("express");
const connectDB = require("./db/db");
const cron = require("node-cron");
const sendEmail = require("./mailer/mailer");
const eventRoutes = require("./routes/Event");
const userRoutes = require("./routes/User");
require("./mailer/scheduler");
const functions = require("firebase-functions");

const app = express();

app.use(cors());
app.use(express.json());
app.use(eventRoutes);
app.use(userRoutes);
connectDB();

function checkForUpcomingEvents() {
  const now = new Date();
  const thirtyMinutesLater = new Date(now.getTime() + 30 * 60000);

  Event.find(
    {
      start: { $gte: now, $lte: thirtyMinutesLater },
      isDeleted: false,
      reminderSent: { $ne: true },
    },
    (err, events) => {
      if (err) {
        console.error("Error fetching events", err);
        return;
      }

      events.forEach((event) => {
        sendEmail(
          event.email,
          "Event Reminder",
          `Reminder: Your event ${event.name} is starting soon at ${event.start}.`
        );
        Event.updateOne({ _id: event._id }, { reminderSent: true }, (err) => {
          if (err) console.error("Failed to update event reminder status", err);
        });
      });
    }
  );
}

cron.schedule("* * * * *", checkForUpcomingEvents);
exports.api = functions.https.onRequest(app);
