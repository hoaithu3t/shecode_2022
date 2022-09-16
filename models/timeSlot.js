const mongoose = require("mongoose");

const timeSlotSchema = mongoose.Schema(
  {    
    value: Date,
    freeTime: [Date],
  },
  {
    timestamps: true,
  }
);

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

module.exports = { TimeSlot, timeSlotSchema };
