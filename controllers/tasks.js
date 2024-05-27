
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

const uncompletedTasks = async (req, res) => {
    try {
        const { data } = await axios.get(process.env.GETUNCOMPLETEDTASKS);
        res.json({
            ok: true,
            tasks: data
        })
    } catch (err) {
        handleError(err, res, 'getUncompletedTasks');
    }
};

// Craete a Task
const createTask = async (req, res) => {
    try {
        const { data } = await axios.post(process.env.CREATETASK, { requestBody: req.body });
        res.status(201).json({
            ok: true,
            event: data.event
        })
        logger.info('Task was created', data.event);
    } catch (err) {
        handleError(err, res, 'createTask');
    }
};

// Update a Task
const updateTask = async (req, res) => {
    try {
        const { data } = await axios.post(process.env.UPDATETASK, { requestBody: req.body });
        res.status(201).json({
            ok: true,
            event: data.event
        })
        logger.info('Task was created', data.event);
    } catch (err) {
        handleError(err, res, 'createTask');
    }
};

module.exports = {
    createTask,
    uncompletedTasks,
    // updateTask,
}