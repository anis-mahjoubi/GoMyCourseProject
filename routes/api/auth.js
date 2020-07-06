const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Login user
// @access  Public
router.post("/", (req, res) => {
  let { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ msg: "Please enter all data | body : "+JSON.stringify(req.body) });

  User.findOne({ email: email }).then((user) => {
    if (!user) return res.status(400).send({ msg: "User does not exist" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).send({ msg: "Bad crediential" });
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        // { expiresIn: config.get("tokenExpire") },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get current user
// @access  Public
router.get("/user", auth, (req, res) => {
  User.findById(req.userid)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
