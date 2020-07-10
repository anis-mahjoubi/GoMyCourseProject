const router = require("express").Router();
const auth = require("../../middleware/auth");

const Cour = require("../../models/Cour");

// @route   GET api/cours
// @desc    Get all courses
// @access  Public
router.get("/", (req, res) => {
  Cour.find().sort('date').then((cours) => res.json(cours));
});

// @route   POST api/cours
// @desc    Add new course
// @access  Private
router.post("/", auth, (req, res) => {
  let newCour = new Cour(req.body);
  
console.log("new course : "+newCour)
  if(!newCour.name || !newCour.id_author) res.status(400).send({msg:"Please add all field"})
  newCour.save()
    .then((savedCourse) => res.json({ "msg": "Added course", "course": savedCourse}))
    .catch((err)=>{res.status(400).json({"msg" : err}); })
});

// @route   PUT api/cours
// @desc    Update a course
// @access  Private
router.put("/:id", auth, (req, res) => {
  let id = req.params.id;
  let data = req.body;
  Cour.findOneAndUpdate({ _id: id }, data).then((cour) => res.json(cour));
});

// @route   DELETE api/cours/:id
// @desc    Delete a course by ID
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Cour.findById(req.params.id)
    .then((cour) => cour.remove().then(() => res.json({ deleteSuccess: true })))
    .catch((err) => res.status(404).json({ deleteSuccess: false }));
});

// @route   DELETE api/cours/user/:id
// @desc    Delete a course by ID
// @access  Private
router.delete("/user/:id", auth, (req, res) => {
  Cour.deleteMany({id_author : req.params.id})
    .then(() => res.json({ deleteSuccess: true }))
    .catch((err) => res.status(404).json({ deleteSuccess: false }));
});

module.exports = router;
