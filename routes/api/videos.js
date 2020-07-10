const router = require("express").Router();
const auth = require("../../middleware/auth");

const Video = require("../../models/Video");

// @route   GET api/videos
// @desc    Get all videos
// @access  Public
router.get("/", (req, res) => {
  Video.find().sort('date').then((videos) => res.json(videos));
  //.then(videos => res.json(videos.map(video=>({...video, link : video.link.replace("/watch?v=","/embed/")}) )))
});

// @route   POST api/videos
// @desc    Add new video
// @access  Private
router.post("/", auth, (req, res) => {
  let newVideo = new Video(req.body);
  newVideo.save().then((video) => res.json(video));
});

// @route   PUT api/videos
// @desc    Add new video
// @access  Private
router.put("/:id", auth, (req, res) => {
  let id = req.params.id;
  let data = req.body;
  Video.findOneAndUpdate({ _id: id }, data).then((video) => res.json(video));
});

// @route   DELETE api/videos/:id
// @desc    Delete a video
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Video.findById(req.params.id)
    .then((video) =>
      video.remove().then(() => res.json({ deleteSuccess: true }))
    )
    .catch((err) => res.status(404).json({ deleteSuccess: false }));
});

// // @route   DELETE api/videos/user/:id
// // @desc    Delete a video
// // @access  Private
// router.delete("/user/:id", auth, (req, res) => {
//   Video.deleteMany({ id_user: req.params.id })
//     .then(() => res.json({ deleteSuccess: true }))
//     .catch((err) => res.status(404).json({ deleteSuccess: false }));
// })

module.exports = router;
