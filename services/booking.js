const fs = require("fs");
const path = require("path");
const { Booking } = require("../models/booking");

const createBooking = (dataBooking) => {
    const {doctorInfo, patientInfo} = dataBooking;
  const newDoctor = new Booking({
    ...dataBooking, status: 'pending',
    doctorId: doctorInfo.id,
    patientId: patientInfo.id
  });
  return newDoctor.save();
};

const getListBookingDoctor = async (doctorId) => {
    const doctor = await Booking.find({ doctorId}).exec();
    doctor.sort((doctorA, doctorB) => getDistance(doctorA.lat, doctorA.long, lat,long)< getDistance(doctorB.lat, doctorB.long, lat,long))
    return doctor;
};

const getListBookingPatient = async ( patientId = '') => {
    const doctor = await Booking.find({ patientId}).exec();
    doctor.sort((doctorA, doctorB) => getDistance(doctorA.lat, doctorA.long, lat,long)< getDistance(doctorB.lat, doctorB.long, lat,long))
    return doctor;
};

const changeStatusListBooking = async (id, status) => { 
    const newBooking = await Booking.findOneAndUpdate({ _id: id }, { ...customer, status }, {
        new: true,
      });
      return newBooking;
};

module.exports = {
    createBooking,
    getListBookingDoctor,
    getListBookingPatient,
    changeStatusListBooking,
};
