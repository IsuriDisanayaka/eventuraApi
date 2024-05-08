const mongoose = require("mongoose");
const Joi = require("joi");

const eventSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Event = mongoose.model("  Event", eventSchema);
const eventValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  start: Joi.date().required(),
  end: Joi.date().required(),
});

module.exports = {
  Event,
  eventValidationSchema,
};
