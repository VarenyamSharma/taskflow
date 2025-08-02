import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Get user preferences
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user.preferences });
  } catch (error) {
    logger.error('Error fetching user preferences:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update user preferences
router.put('/', auth, async (req, res) => {
  try {
    const { theme, notifications } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update preferences
    if (theme) user.preferences.theme = theme;
    if (notifications) {
      user.preferences.notifications = {
        ...user.preferences.notifications,
        ...notifications
      };
    }

    await user.save();
    res.json({ success: true, data: user.preferences });
  } catch (error) {
    logger.error('Error updating user preferences:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
