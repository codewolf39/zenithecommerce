const router = require("express").Router();
const { response } = require("express");
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register a User
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PAS_SEC
      ).toString(),
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Login a User
router.post("/login", async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Invalid credentials");
    }

    // Decrypt and validate password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PAS_SEC
    );

    let validate;
    try {
      validate = hashedPassword.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return res.status(401).json("Invalid credentials");
    }

    if (validate !== req.body.password) {
      return res.status(401).json("Invalid credentials");
    }

    // Generate JWT token after successful validation
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC_KEY,
      { expiresIn: "3d" }
    );

    // Destructure user data to exclude sensitive information
    const { password, ...others } = user._doc;

    // Send response with user details and access token
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
