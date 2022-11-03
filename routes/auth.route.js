const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/signup", async function (req, res) {
  try {
    if (await User.findOne({ username: req.body.username })) {
      return res.status(200).json("Username already exists");
    }

    if (await User.findOne({ email: req.body.email })) {
      return res.status(200).json("Email already exists");
    }
    const newUser = await User.create({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    res.status(201).json("Account is created");
  } catch (err) {
    res.json(err);
  }
});

router.post("/login", async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong email!");
    }

    const hashedPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!hashedPassword) {
      return res.status(401).json("Wrong password!" );
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC
    );
    const { password, ...rest } = user._doc;
    res.status(200).json({ ...rest, accessToken });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
