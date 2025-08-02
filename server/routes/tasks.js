import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  toggleArchiveTask,
  bulkUpdateTasks
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import { apiLimiter } from '../middleware/rateLimiter.js';
import {
  validateCreateTask,
  validateUpdateTask,
  validateTaskQuery,
  validateObjectId
} from '../middleware/validation.js';
import { body } from 'express-validator';

const router = express.Router();

// Apply protection and rate limiting to all routes
router.use(protect);
router.use(apiLimiter);

// Routes
router.route('/')
  .get(validateTaskQuery, getTasks)
  .post(validateCreateTask, createTask);

router.route('/stats')
  .get(getTaskStats);

router.route('/bulk')
  .patch([
    body('taskIds')
      .isArray({ min: 1 })
      .withMessage('Task IDs array is required'),
    body('taskIds.*')
      .isMongoId()
      .withMessage('Invalid task ID format'),
    body('updates')
      .isObject()
      .withMessage('Updates object is required'),
  ], bulkUpdateTasks);

router.route('/:id')
  .get(validateObjectId, getTask)
  .put(validateUpdateTask, updateTask)
  .delete(validateObjectId, deleteTask);

router.route('/:id/archive')
  .patch(validateObjectId, toggleArchiveTask);

export default router;