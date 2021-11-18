const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const UserModal = require("./models/User");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config({ path: "./config/config.env" });
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log(result);
    app.listen(3000);
  });



app.get("/", (req, res, next) => {
  res.send("hello");
});

app.get("/api/users", (req, res, next) => {
  UserModal.find({}, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

app.post("/api/user/add", (req, res, next) => {
  const user = new UserModal({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });
  user.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ code: 200, msg: "added successfully", data });
    }
  });
});

app.put("api/user/edit/:id", (req, res, next) => {
  const user = new UserModal({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });
  UserModal.findByIdAndUpdate(
    req.params.id,
    { $set: user },
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).json({ code: 200, msg: "updated successfully", data });
      } else {
        console.log(err);
      }
    }
  );
});

app.delete("api/user/:id", (req, res, next) => {
  UserModal.findByIdAndRemove(req.param.id, (err, data) => {
    if (!err) {
      res.send(200).json({ code: 200, msg: "deleted successfully", data });
    } else {
      console.log(err);
    }
  });
});
