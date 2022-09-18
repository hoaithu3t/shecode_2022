const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = Schema(
  {
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
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = { Doctor, doctorSchema };
