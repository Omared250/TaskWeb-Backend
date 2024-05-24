const { response } = require('express');
const logger = require('../winston-config');
const axios = require('axios');
require('dotenv').config();

const handleError = (err, res, action) => {
    const statusCode = err.response ? err.response.status : 500;
    const message = err.response && err.response.data ? err.response.data.msg : `An unexpected error occurred with ${action}`;
    const stack = err.stack;
    const errorDetails = {
        action,
        statusCode,
        message,
        stack,
        url: err.config ? err.config.url : undefined,
    };

    logger.error(errorDetails);

    res.status(statusCode).json({
        ok: false,
        msg: message
    });
};

const getEvents = async (req, res = response) => {
    try {
        const { data } = await axios.get(process.env.GETEVENTS_MICROSERVICE);
        res.json({
            ok: true,
            events: data.events
        })
    } catch (err) {
        handleError(err, res, 'getEvents');
    }
};

const createEvent = async (req, res = response) => {

    try {
        const { data } = await axios.post(process.env.CREATEEVENTS_MICROSERVICE, { requestBody: req.body, requestUser: req.uid });
        res.status(201).json({
            ok: true,
            event: data.event
        })
        logger.info('Event was created', data.event);
    } catch (err) {
        handleError(err, res, 'createEvent');
    }
};

const updateEvent = async (req, res = response) => {
    try {
        const { data } = await axios.put(process.env.UPDATEEVENTS_MICROSERVICE, { requestBody: req.body, requestParam: req.params.id, requestUser: req.uid });
        res.status(200).json({
            ok: true,
            event: data.event
        })
        logger.info('Event was updated', data.event);
    } catch (err) {
        handleError(err, res, 'updateEvent');
    }
};

const deleteEvent = async (req, res = response) => {
    try {
        const { data } = await axios.delete(process.env.DELETEEVENTS_MICROSERVICE, {
            params: {
                id: req.params.id,
                uid: req.uid
            }
        });
        res.status(200).json({
            ok: true,
            event: 'Event Deleted'
        })
        logger.info('Event was deleted', data);
    } catch (err) {
        handleError(err, res, 'deleteEvent');
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
