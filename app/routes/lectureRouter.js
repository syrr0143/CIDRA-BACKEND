// routes/lectureRoutes.js
const express = require('express');
const Lecture = require('../model/lectureModel');
const teacherauthMiddleware = require('../middleware/teacherauthmiddleware');

const router = express.Router();

// Admin posts a lecture
router.post('/post-lecture', teacherauthMiddleware, async (req, res) => {
  try {
    const { content, link } = req.body;

    // The authMiddleware should set the user details in the request
    const author = req.teacher._id;

    // Create a new lecture
    const newLecture = new Lecture({ content, link, author });

    await newLecture.save();

    res.status(201).json({ message: 'Lecture link posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all lectures
router.get('/lectures', async (req, res) => {
  try {
    // const lectures = await Lecture.find().sort({ date: 'desc' });
    const lectures = await Lecture.find().populate('author', 'name').sort({ date: 'desc' });
    res.status(200).json({ lectures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
