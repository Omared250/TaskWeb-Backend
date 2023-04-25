/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const router = Router();

// get events
router.get('/', validateJWT, getEvents );

// Create an event
router.post('/', validateJWT, createEvent );

// Update event
router.put('/:id', validateJWT, updateEvent );

// Update event
router.delete('/:id', validateJWT, deleteEvent );

module.exports = router;