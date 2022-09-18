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
      type: {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
          },  
        rating: Number,
      },
    }],
    listTimeSlots: [{
      type: {    
        value: Date,
        freeTime: [Date],
    }    
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
