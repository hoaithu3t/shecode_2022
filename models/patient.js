const mongoose = require("mongoose");
const crypto = require("crypto");

const patientSchema = mongoose.Schema(
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
    dateOfBirth: Date,    
  },
  {
    timestamps: true,
  }
);

patientSchema.methods.generatePassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("hex");
};

patientSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === this.hash;
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = { Patient, patientSchema };
