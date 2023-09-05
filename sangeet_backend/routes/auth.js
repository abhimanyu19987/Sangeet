const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

// This POST route will help to register a user
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);
  console.log(newUserData);

  // Step 4: We want to create the token to return to the user
  const token = await getToken(email, newUser);

  // Step 5: Return the result to the user
  const userToReturn = { ...newUser.toJSON(), token };
  console.log(userToReturn);
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
  // Step 1: Get email and password sent by user from req.body
  const { email, password } = req.body;

  // Step 2: Check if a user with the given email exists. If not, the credentials are invalid.
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  console.log(user);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid credential" });
  }

  const token = await getToken(user.email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.put(
  "/updateprofile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { password, firstName, lastName, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
      password: hashedPassword,
      firstName,
      lastName,
      username,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  }
);


router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(res);
    res.clearCookie("token", { path: "/login" });
    return res;
  }
);

module.exports = router;