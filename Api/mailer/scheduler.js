const cron = require("node-cron");
const { Event } = require("../models/Event");
const { sendEmail } = require("./emailService");

const reminderCheck = async () => {
  const now = new Date();
  const tenMinutesLater = new Date(now.getTime() + 10 * 60000);

  const events = await Event.find({
    start: { $gte: now, $lte: tenMinutesLater },
    isDeleted: false,
    reminderSent: false,
  });

  for (const event of events) {
    const emailContent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #0056b3;">Event Reminder</h1>
        <p > Your event "<strong>${event.name}</strong>" is starting soon at <strong>${event.start}</strong>.</p>
    </div>
`;
    await sendEmail(event.email, "Event Reminder", emailContent);

    event.reminderSent = true;
    await event.save();
  }
};

cron.schedule("* * * * *", reminderCheck);
