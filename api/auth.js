const router = require("express").Router();
const {
  register,
  login,
  generateJWT,
  generateSession,
} = require("../services/auth");
const ERROR = require("../types/error");

router.post("/register", (req, res) => {
  const { username, password, bio, education } = req.body;
  console.log('da register');
  register(username, password, bio, education)
    .then((result) => {
      res.json({ success: true });
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
  console.log('da register');

  const { username, password } = req.body;
  login(username, password)
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
