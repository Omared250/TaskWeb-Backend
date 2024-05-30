const { Router } = require('express');
const { getCompletedTasks, getUncompletedTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks');
const router = Router();

// GetUncompletedTasks
router.get('/uncompleted', getUncompletedTasks);

// GetUncompletedTasks
router.get('/completed', getCompletedTasks);

// Create Task
router.post('/createTask', createTask);

// Update Task
router.put('/updateTask/:id', updateTask);

// Delete Task
router.delete('/deleteTask/:id', deleteTask);

// // Complete a task
// router.patch('/:id/complete', completeTask);

// // retake a task
// router.patch('/:id/retake', retakeTask);

module.exports = router;