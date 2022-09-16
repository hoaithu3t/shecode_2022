const router = require("express").Router();
const {
  register,
  login,
  generateJWT,
  generateSession,
} = require("../services/auth");
const ERROR = require("../types/error");

router.post("/register", (req, res) => {
  const { name, email, password, phoneNumber, dateOfBirth } = req.body;
  register(name, email, password, phoneNumber, dateOfBirth)
    .then((result) => {
      res.json({ success: true, result });
    })
    .catch((err) => {
      switch (err.message) {
        case ERROR.USERNAME_EXISTED:
          res.status(409).json({ success: false, err: ERROR.USERNAME_EXISTED });
          break;
        default:
          res.status(500).json({ success: false, err: ERROR.INTERNAL_ERROR });
          break;
      }
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then((user) => {
      const token = generateJWT(user);
      const session = generateSession(user);
      res.json({
        user: user,
        token: token,
        session: session,
      });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err: err.message });
    });
});

module.exports = router;
