// routes/assignmentRoutes.js
const express = require('express');
const Assignment = require('../model/assignmentModel');
const authMiddleware = require('../middleware/authmiddleware');
const teacherAuthMiddleware = require('../middleware/teacherauthmiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Admin posts an assignment
router.post('/post-assignment', teacherAuthMiddleware, upload.single('pdf'), async (req, res) => {
  try {
    const { content, dueDate, googleFormLink } = req.body;


        // Check if req.file exists and use req.file.buffer
        const pdfContent = req.file ? req.file.buffer : null;
    // The authMiddleware should set the user details in the request
    const author = req.teacher.name; // Assuming your user model has a 'name' field

    // Create a new assignment
    const newAssignment = new Assignment({
      author,
      content,
      dueDate,
      googleFormLink,
      pdf: pdfContent, // Multer adds 'buffer' to the request file
    });

    await newAssignment.save();

    res.status(201).json({ message: 'Assignment posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error',details: error.message });
  }
});
// to show the assignment posted by the user

router.get('/get-assignment', teacherAuthMiddleware, async (req, res) => {
  try {
    // this code is given by s_u_m_i_t__y_a_d_a_v
    // The teacherauthMiddleware should set the user details in the request
    const authorId = req.teacher._id;

    // Fetch lectures posted by the logged-in teacher
    const assignment = await Assignment.find({ author: authorId }).populate('author', 'name');

    // If no lectures are found, return a message
    if (assignment.length === 0) {
      return res.status(404).json({ message: 'No assignment found for this teacher' });
    }

    // Format and send the response
    const formattedassignment = assignment.map(assignment  => ({
      content: assignment.content,
      date: assignment.date,
      author:assignment.author
    }));

    res.status(200).json({ assignment: formattedassignment  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all assignments
router.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ date: 'desc' });

    res.status(200).json({ assignments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
