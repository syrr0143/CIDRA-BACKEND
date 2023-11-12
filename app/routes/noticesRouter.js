// routes/noticeRoutes.js
const express = require('express');
const Notice = require('../model/NoticesModel');
const authMiddleware = require('../middleware/authmiddleware');// Add your authentication middleware here

const router = express.Router();

// // Admin posts a notice , this is dummy route working
// router.post('/post-notice', async (req, res) => {
//   try {
//     const { content } = req.body;

//     // The authMiddleware should set the user details in the request
//     const {author} =  req.body; 

//     // Create a new notice
//     const newNotice = new Notice({ content, author });

//     await newNotice.save();

//     res.status(201).json({ message: 'Notice posted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// Admin posts a notice actual route 
router.post('/post-notice', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    // The authMiddleware should set the user details in the request
    const author = req.user._id;

    // Create a new notice
    const newNotice = new Notice({ content, author });

    await newNotice.save();

    res.status(201).json({ message: 'Notice posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all notices
router.get('/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: 'desc' }).populate('author', 'name');

    res.status(200).json({ notices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
