const router = require("express").Router();
const auth = require("../../middleware/auth");

const Comment = require("../../models/Comment");

// @route   GET api/comments
// @desc    Get all comments
// @access  Public
router.get("/", (req, res) => {
  Comment.find()
    .sort({ date: 1 })
    .then((comments) => res.json(comments));
});

// @route   POST api/comments
// @desc    Add new comment
// @access  Private
router.post("/", auth, (req, res) => {
  let newComment = new Comment(req.body);
  newComment
    .save()
    .then((comment) => res.json(comment))
    .catch((err) => console.log(err));
});

// @route   DELETE api/comments
// @desc    Delete a comment
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Comment.findById(req.params.id)
    .then((comment) =>
      comment.remove().then(() => res.json({ deleteSuccess: true }))
    )
    .catch((err) => res.status(404).json({ deleteSuccess: false }));
});

module.exports = router;
