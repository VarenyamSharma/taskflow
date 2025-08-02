import Task from '../models/Task.js';
import logger from '../utils/logger.js';

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      priority,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      includeArchived = false
    } = req.query;

    // Build query
    const query = { 
      user: req.user.id,
      isArchived: includeArchived === 'true' ? { $in: [true, false] } : false
    };

    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Add filters
    if (priority) query.priority = priority;
    if (status) query.status = status;

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const tasks = await Task.find(query)
      .sort(sortObj)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'username email');

    // Get total count for pagination
    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      count: tasks.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: tasks
    });
  } catch (error) {
    logger.error('Get tasks error:', error);
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('user', 'username email');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    logger.error('Get task error:', error);
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const task = await Task.create(req.body);

    logger.info(`Task created: ${task.title}`, {
      taskId: task._id,
      userId: req.user.id,
      priority: task.priority,
      status: task.status
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    logger.error('Create task error:', error);
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    logger.info(`Task updated: ${task.title}`, {
      taskId: task._id,
      userId: req.user.id,
      updatedFields: Object.keys(req.body)
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    logger.error('Update task error:', error);
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await task.deleteOne();

    logger.info(`Task deleted: ${task.title}`, {
      taskId: task._id,
      userId: req.user.id
    });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    logger.error('Delete task error:', error);
    next(error);
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
export const getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.getTaskStats(req.user.id);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Get task stats error:', error);
    next(error);
  }
};

// @desc    Archive/Unarchive task
// @route   PATCH /api/tasks/:id/archive
// @access  Private
export const toggleArchiveTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task.isArchived = !task.isArchived;
    await task.save();

    logger.info(`Task ${task.isArchived ? 'archived' : 'unarchived'}: ${task.title}`, {
      taskId: task._id,
      userId: req.user.id
    });

    res.status(200).json({
      success: true,
      message: `Task ${task.isArchived ? 'archived' : 'unarchived'} successfully`,
      data: task
    });
  } catch (error) {
    logger.error('Toggle archive task error:', error);
    next(error);
  }
};

// @desc    Bulk update tasks
// @route   PATCH /api/tasks/bulk
// @access  Private
export const bulkUpdateTasks = async (req, res, next) => {
  try {
    const { taskIds, updates } = req.body;

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Task IDs array is required'
      });
    }

    const result = await Task.updateMany(
      {
        _id: { $in: taskIds },
        user: req.user.id
      },
      updates,
      { runValidators: true }
    );

    logger.info(`Bulk update performed on ${result.modifiedCount} tasks`, {
      userId: req.user.id,
      taskIds,
      updates
    });

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} tasks updated successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    logger.error('Bulk update tasks error:', error);
    next(error);
  }
};