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
    comment: {
        type: {
          note: String,
          patient: {
            type: Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
          },
        },
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = { Doctor, doctorSchema };
