// routes/complaintRoutes.js
const express = require('express');
const Complaint = require('../model/complaintModel');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

// Student submits a complaint
router.post('/submit-complaint', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    // The authMiddleware should set the user details in the request
    const author = req.user._id;
    const authorname = req.user.name;
// this code is given by s_u_m_i_t__y_a_d_a_v
    // Create a new complaint
    const newComplaint = new Complaint({ author,authorname, content });

    await newComplaint.save();

    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all complaints (for admin use)
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ time: 'desc' }).populate('author', 'name');;

    res.status(200).json({ complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
