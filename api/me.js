const router = require('express').Router();
const authMdw = require('../middleware/auth');

router.get('/', authMdw(), (req, res) => {
  res.json({ user: req.user, token: req.token });
});


module.exports = router;
