
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

const getUncompletedTasks = async (req, res) => {
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

const getCompletedTasks = async (req, res) => {
    try {
        const { data } = await axios.get(process.env.GETCOMPLETEDTASKS);
        res.json({
            ok: true,
            tasks: data
        })
    } catch (err) {
        handleError(err, res, 'getUncompletedTasks');
    }
};

const createTask = async (req, res) => {
    try {
        const { data } = await axios.post(process.env.CREATETASK, req.body );
        res.json({
            ok: true,
            task: data
        });
    } catch (err) {
        handleError(err, res, 'createTask'); 
    }
}

const updateTask = async (req, res = response) => {
    try {
        const { data } = await axios.put(`${process.env.UPDATETASK}/${req.params.id}`, { requestBody: req.body });
        res.status(200).json({
            ok: true,
            event: data.event
        })
        logger.info('Task was updated', data.event);
    } catch (err) {
        handleError(err, res, 'updateTask');
    }
};

const deleteTask = async (req, res = response) => {
    try {
        const { data } = await axios.delete(`${process.env.DELETETASK}/${req.params.id}`);
        res.status(200).json({
            ok: true,
            event: 'Task Deleted'
        })
        logger.info('Event was deleted', data);
    } catch (err) {
        handleError(err, res, 'deleteEvent');
    }
};

module.exports = {
    getUncompletedTasks,
    getCompletedTasks,
    createTask,
    updateTask,
    deleteTask
}