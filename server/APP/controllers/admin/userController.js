const User = require("../../models/User.model");

//Add User
const userInsert = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json({ message: "User added Succesfully", user: saved });
  } catch (err) {
    res.status(500).json({ message: "Add User failed", error: err.message });
  }
};

//Update User
const updateUser = async (req, res) => {
  try {
    const updateId = req.params.id;
    const updated = await User.findByIdAndUpdate(updateId, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "User update failed", error: err.message });
  }
};

//Delete user
const deleteUser = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const deleted = await User.findByIdAndDelete(deleteId);
    if (!deleted) return res.status(404).json({ message: "user not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "User delete failed", error: err.message });
  }
};

//View all Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true, role: "customer" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Users fetch failed", error: err.message });
  }
};

//Get user by Id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.isActive || user.role !== "customer") {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "User fetch failed" });
  }
};

module.exports = {
  userInsert,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
