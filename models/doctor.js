const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = Schema(
  {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
      },  
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    lat:Number,
    long: Number,
    rating: Number,
    services: [{
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    }],
    listTimeSlots: [{
      type: Schema.Types.ObjectId,
      ref: "TimeSlot",
      required: true,
    }],
    listNameServices: String,
    address: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

doctorSchema.methods.generateTextSearch = function () {
  this.textSearch =
    this.name + ' '+ this.services.map(service => service.name).join(' ')
};

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = { Doctor, doctorSchema };
