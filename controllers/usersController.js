const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("express");

//@des Registers a new user
//@routes POST /api/users/register
//@access Public
const registerNewuser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }
  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (createdUser) {
    res.status(201).json({ _id: createdUser.id, email: createdUser.email });
  } else {
    res.status(400);
    throw new Error("User data is not vaild");
  }
});

//@des Login using user credentials
//@routes POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const user = await User.findOne({ email });
  //Comapre the password
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "30m" }
    );
    res.status(200).json({ token });
  } else {
    res.status(401);
    throw new Error("Email or Password is not vaild");
  }
});

//@des Returns current users data
//@routes POST /api/users/current
//@access Private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerNewuser,
  loginUser,
  getCurrentUser,
};
