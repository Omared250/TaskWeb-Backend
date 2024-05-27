const { Router } = require('express');
const { createTask } = require('../controllers/tasks');
const router = Router();

// Create Task
router.post('/createTask', createTask);

// // Update Task
// router.put('/updateTask/:id', updateTask);

// // Delete Task
// router.delete('/deleteTask/:id', deleteTask);

// // Complete a task
// router.patch('/:id/complete', completeTask);

// // retake a task
// router.patch('/:id/retake', retakeTask);

module.exports = router;