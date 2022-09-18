const fs = require("fs");
const path = require("path");
const { Doctor } = require("../models/doctor");
const ERROR = require("../types/error");

const createDoctor = (user) => {
    //name, email, password, phoneNumber, dateOfBirth, lat, long, services, listTimeSlots, address, description
  const newDoctor = new Doctor(user);
  newDoctor.generateTextSearch();
  return newDoctor.save();
};

const getListDoctor = async ({textSearch = '', lat,long}) => {
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return abs(R * c / 1000); // in metres        
    }
    const doctor = await Doctor.find(        
        { textSearch: { $regex: new RegExp(`.*${textSearch}.*`), $options: "i" } },
    ).exec();
    doctor.sort((doctorA, doctorB) => getDistance(doctorA.lat, doctorA.long, lat,long)< getDistance(doctorB.lat, doctorB.long, lat,long))
    return doctor;
};

const getDoctor = async (id, getInfoCalender = false) => {
    const {services,listTimeSlots, ... dataCustomerBase} = await User.findOne({
      _id: id,
    });
    return getInfoCalender ? 
        {services,listTimeSlots} : 
        {...dataCustomerBase, serviceNames: services.map(ser => ser.name)}
  };

module.exports = {
    createDoctor,
    getListDoctor,
    getDoctor,
};
