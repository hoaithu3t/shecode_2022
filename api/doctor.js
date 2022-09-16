const {
  createDoctor,
  getListDoctor,
  getDoctor
} = require("../services/doctor");

const router = require("express").Router();

router.post("/", (req, res) => {
  createDoctor(req.body).then((doctor) => res.json(doctor));
});

router.get("/", (req, res) => {
  getListDoctor(req.body).then((doctor) => {
    res.json(doctor);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const {getInfoCalender} = req.query;
  getDoctor(id, getInfoCalender).then((doctor) => res.json(doctor));
});

module.exports = router;
