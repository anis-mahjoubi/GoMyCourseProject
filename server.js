const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const videos = require("./routes/api/videos");
const comments = require("./routes/api/comments");
const cours = require("./routes/api/cours");
const auth = require("./routes/api/auth");
const config = require("config");

const app = express();

app.use(express.json());

const mongo_url = config.get("mongo_url");

mongoose
  .connect(mongo_url, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/videos", videos);
app.use("/api/comments", comments);
app.use("/api/cours", cours);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
