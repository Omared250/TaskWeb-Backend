/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const router = Router();

// Validate Token
router.use( validateJWT );

// get events
router.get('/', getEvents );

// Create an event
router.post('/', createEvent );

// Update event
router.put('/:id', updateEvent );

// Update event
router.delete('/:id', deleteEvent );

module.exports = router;