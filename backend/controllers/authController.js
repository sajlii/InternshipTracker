const User = require('../models/User');
const { generateToken } = require('../utils/tokenHelper');
const { validationResult } = require('express-validator');

// Register new user
exports.register = async (req, res) => {
  try {
    console.log('📝 Registration attempt:', {
      fullName: req.body.fullName,
      email: req.body.email,
      hasPassword: !!req.body.password,
      allFields: Object.keys(req.body)
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { fullName, email, password, phone, university, degree, graduationYear } = req.body;

    console.log('🔍 Checking for existing user...');
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('❌ Email already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    console.log('🔨 Creating new user...');
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      phone: phone || undefined,
      university: university || undefined,
      degree: degree || undefined,
      graduationYear: graduationYear || undefined
    });

    console.log('✅ User created successfully:', user.email);

    console.log('🎟️  Generating token...');
    const token = generateToken(user._id);
    console.log('✅ Token generated');

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (error) {
    console.error('❌ Registration error FULL:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch profile'
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const allowedUpdates = ['fullName', 'phone', 'university', 'degree', 'graduationYear', 'bio'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update profile'
    });
  }
};