const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = Schema(
  {
    doctorId: {
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        required: true,
    },
    doctorInfo: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    patientInfo:{
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    }, 
    time: {
        type: Date
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    }],
    status: 'pending'| 'accept'|'reject'|'complete'
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = { Booking, bookingSchema };
