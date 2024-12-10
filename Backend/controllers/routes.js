const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res
      .status(400)
      .send({ message: "Email already exists, try with another email" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 
    
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    
    await newUser.save();
    return res.status(201).send({ message: "User registered successfully" }); 
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .send({ message: "Server error, please try again later" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "User not found" }); 
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" }); 
    }

    return res.status(200).send({ message: "Login successful" }); 
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .send({ message: "Server error, please try again later" });
  }
};

const updateEmail = async (req, res) => {
  const { currentEmail, newEmail } = req.body;
  if (!currentEmail || !newEmail) {
    return res
      .status(400)
      .send({ message: "Current email and new email are required" });
  }

  try {
    const user = await User.findOne({ email: currentEmail });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res
        .status(400)
        .send({ message: "The new email is already in use by another user" });
    }

    user.email = newEmail;
    await user.save();

    res.status(200).send({ message: "Email updated successfully", user });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "Server error" });
  }
};
const deleteUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .send({ message: "Email is required to delete the user" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await User.deleteOne({ email });
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "Server error" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = { register, login, updateEmail,deleteUser,getAllUsers };


