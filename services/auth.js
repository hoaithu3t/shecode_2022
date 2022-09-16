const jwt = require("jsonwebtoken");

const { Patient } = require("../models/patient");
const ERROR = require("../types/error");

const register = async (name, email, password, phoneNumber, dateOfBirth) => {

  const user = await Patient.findOne({ email });

  if (user) throw new Error(ERROR.USERNAME_EXISTED);
  const newPatient = new Patient({
    name, email, password, phoneNumber, dateOfBirth
  });
  newPatient.generatePassword(password);
  return newPatient.save();
};

const login = async (email, password) => {
  const user = await Patient.findOne({ email });
  if (!user) throw new Error(ERROR.EMAIL_NOT_EXISTED);
  if (!user.validatePassword(password)) {
    throw new Error(ERROR.PASSWORD_NOT_MATCHED);
  }
  return user;
};

const generateJWT = (user) => {
  const accessToken = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET
  );
  return accessToken;
};

const generateSession = (user) => {
  const accessToken = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 10, email: user.email },
    process.env.JWT_SECRET
  );
  return accessToken;
};

module.exports = { register, login, generateJWT, generateSession };
