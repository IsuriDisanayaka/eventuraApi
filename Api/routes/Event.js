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
    const events = await Event.find({ isDeleted: { $ne: true } });
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
  try {
    const searchQuery = {};
    const queryParameters = ["name", "description", "start", "end"];

    queryParameters.forEach((param) => {
      if (req.query[param]) {
        searchQuery[param] = req.query[param];
      }
    });
    if (req.query.isDeleted && req.query.isDeleted === "true") {
      searchQuery.isDeleted = true;
    } else {
      searchQuery.isDeleted = { $ne: true };
    }
    const events = await Event.find(searchQuery);

    if (events.length === 0) {
      return res.status(404).json({ error: "No events found" });
    }
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/event/:eventId", async (req, res) => {
  try {
    const { error } = eventValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const event = await Event.findOne({ eventId: req.params.eventId });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.isDeleted === true) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.set(req.body);
    if (req.body.isDeleted === true) {
      event.isDeleted = true;
    }
    await event.save();
    return res.status(200).json({
      success: "Event updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Failed to update event" });
  }
});

module.exports = router;