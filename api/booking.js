const {
    createBooking,
    getListBookingDoctor,
    getListBookingPatient,
    changeStatusListBooking,
} = require("../services/booking");

const router = require("express").Router();

router.post("/", (req, res) => {
    createBooking(req.body).then((booking) => res.json(booking));
});

router.get("/getListBookingDoctor", (req, res) => {
    getListBookingDoctor(req.body.doctorId).then((booking) => {
    res.json(booking);
  });
});

router.get("/getListBookingPatient", (req, res) => {
    getListBookingPatient(req.body.patientId).then((booking) => {
    res.json(booking);
  });
});

router.post("/changeStatusListBooking", (req, res) => {
  const { id } = req.params;
  const {status} = req.query;
  changeStatusListBooking(id, status).then((booking) => res.json(booking));
});

module.exports = router;
