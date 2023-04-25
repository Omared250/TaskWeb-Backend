/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { isDate } = require('../helpers/isDate');

const { validateJWT } = require('../middlewares/jwt-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const router = Router();

// Validate Token
router.use( validateJWT );

// get events
router.get('/', getEvents );

// Create an event
router.post(
    '/',
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Start Date is mandatory').custom( isDate ),
        check('end', 'End Date is mandatory').custom( isDate ),
        fieldValidator
    ],
    createEvent 
);

// Update event
router.put(
    '/:id',
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Start Date is mandatory').custom( isDate ),
        check('end', 'End Date is mandatory').custom( isDate ),
        fieldValidator
    ],
    updateEvent
);

// Update event
router.delete('/:id', deleteEvent );

module.exports = router;