const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get("/", (req, res) => {
  User.find().then((users) => res.json(users));
});

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  let { name, email, password, role = "user" } = req.body;

  if (!name || !email || !password || !role)
    return res.status(400).send({ msg: "Please enter all data" });

  User.findOne({ email: email }).then((user) => {
    if (user) return res.status(400).send({ msg: "Email already exist" });
  });
  let newUser = new User({ name, email, password, role });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: config.get("tokenExpire") },
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
});

// @route   PUT api/users
// @desc    Update user
// @access  Private
router.put("/:id", auth, (req, res) => {
  let id = req.params.id;
  let data = req.body;
  User.findOneAndUpdate({ _id: id }, data)
    .then((user) => res.json(user))
    .catch(err => res.status(400).json({msg : 'User not found'}))
});

// @route   POST api/users
// @desc    Delete user
// @access  Private && ADMIN
router.delete("/:id", auth, (req, res) => {
  User.findById(req.params.id)
    .then((user) => user.remove().then(() => res.json({ deleteSuccess: true })))
    .catch((err) => res.status(404).json({ deleteSuccess: false }));
});

module.exports = router;
