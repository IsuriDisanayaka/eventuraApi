const express = require("express");
const router = express.Router();
const { Event, eventValidationSchema } = require("../models/Event");

router.post("/event/save", async (req, res) => {
  try {
    const eventCount = await Event.countDocuments();
    const { error } = eventValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newEvent = new Event({
      eventId: eventCount + 1,
      ...req.body,
    });
    await newEvent.save();
    return res.status(200).json({
      success: "Event Saved Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});

router.get("/events", async (req, res) => {
  try {
    const userEmail = req.query.email;

    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

    const events = await Event.find({
      email: userEmail,
      isDeleted: { $ne: true },
    });

    if (!events.length) {
      return res.status(404).json({ error: "No events found for this user" });
    }

    return res.status(200).json(events);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/event/:eventId", async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId: req.params.eventId },
      { isDeleted: true },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ success: "Event marked as Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/events/find", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res
      .status(400)
      .json({ error: "Event name is required for search." });
  }

  try {
    const events = await Event.find({
      name: new RegExp(name, "i"),
      isDeleted: { $ne: true },
    });
    if (!events.length) {
      return res.status(404).json({ error: "No matching events found." });
    }
    return res.status(200).json(events);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/event/:eventId", async (req, res) => {
  try {
    const { error } = eventValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const event = await Event.findOneAndUpdate(
      { eventId: req.params.eventId },
      req.body,
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({
      success: "Event updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Failed to update event" });
  }
});

module.exports = router;
