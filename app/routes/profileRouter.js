// routes/profileRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const User = require('../model/userModel');

const router = express.Router();

// Get the profile of the logged-in user
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // The authMiddleware should set the user details in the request
    const userId = req.user._id;

    // Fetch the user's data from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Exclude sensitive information like password before sending the response
    const userProfile = {
      name: user.name,
      rollNo: user.rollNo,
      dob: user.dob,
      email: user.email,
      mobileNumber: user.mobileNumber,
      address: user.address,
    };

    res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
