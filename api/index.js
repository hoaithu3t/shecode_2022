const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/me", require("./me"));
router.use("/doctor", require("./doctor"));
router.use("/booking", require("./booking"));

module.exports = router;
