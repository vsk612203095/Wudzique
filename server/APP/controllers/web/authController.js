const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");
const JWT_SECRET = process.env.JWT_SECRET;

//Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, phone, password, address, role } = req.body;

    //check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const newUser = new User({
      username,
      email,
      phone,
      address,
      role,
      authentication: {
        password: hashedPassword,
        salt,
      },
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

//Login User
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //Find user with password field
    const user = await User.findOne({ email, role }).select(
      "+authentication.password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    //Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.authentication.password
    );
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    //Create JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      massage: "Login successfull",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
