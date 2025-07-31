const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/authMiddleware");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  
  console.log("Registration attempt:", { name, email, role });

  try {
    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase().trim() });
    if (user) {
      console.log("User already exists:", email);
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password, // Don't hash here, let the model handle it if it has pre-save middleware
      role 
    });
    
    // Hash password manually (since your original code does this)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    console.log("User created successfully:", user.email);

    // Create JWT payload
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Return user data that frontend expects
    res.status(201).json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Server error during registration" });
  }
});

// Login - FIXED VERSION
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  console.log("Login attempt for:", email);

  try {
    // Find user (case insensitive)
    let user = await User.findOne({ email: email.toLowerCase().trim() });
    console.log("User found:", !!user);
    
    if (!user) {
      console.log("No user found with email:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("User found:", user.email);
    console.log("Stored password hash:", user.password ? "exists" : "missing");
    console.log("Input password:", password ? `[${password.length} chars]` : "empty");

    // ✅ FIXED: Use bcrypt.compare instead of user.comparePassword
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);
    
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create JWT payload
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    console.log("Login successful for user:", email);

    // Return user data that frontend expects
    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error during login" });
  }
});

// Logout (client-side token removal)
router.post("/logout", (req, res) => {
  res.json({ msg: "Logged out (client must delete token)" });
});

// Get current user
router.get("/me", protect, async (req, res) => {
  try {
    // req.user should be set by the protect middleware
    res.status(200).json(req.user);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Protected test routes
router.get("/seeker-only", protect, authorize("seeker"), (req, res) => {
  res.json({ msg: "Welcome, job seeker!" });
});

router.get("/client-only", protect, authorize("client"), (req, res) => {
  res.json({ msg: "Welcome, client!" });
});

module.exports = router;