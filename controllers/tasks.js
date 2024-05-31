
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
        const { data } = await axios.get(`${process.env.GETUNCOMPLETEDTASKS}?userId=${req.query.userId}`);
        res.json({
            ok: true,
            tasks: data
        })
    } catch (err) {
        handleError(err, res, 'getUncompletedTasks');
        throw err;
    }
};

const getCompletedTasks = async (req, res) => {
    try {
        const { data } = await axios.get(`${process.env.GETCOMPLETEDTASKS}?userId=${req.query.userId}`);
        res.json({
            ok: true,
            tasks: data
        })
    } catch (err) {
        handleError(err, res, 'getCompletedTasks');
        throw err;
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
        throw err;
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
        throw err;
    }
};

const deleteTask = async (req, res = response) => {
    try {
        const { data } = await axios.delete(`${process.env.DELETETASK}/${req.params.id}`);
        res.status(200).json({
            ok: true,
            event: 'Task Deleted'
        })
        logger.info('Task was deleted', data);
    } catch (err) {
        handleError(err, res, 'deleteTask');
        throw err;
    }
};

const completeTask = async (req, res = response) => {
    try {
        const { data } = await axios.patch(`${process.env.COMPLETEANDRETAKETASKS}/${req.params.id}/complete`);
        res.status(200).json({
            ok: true,
            task: data
        })
        logger.info('Task was completed', data);
    } catch (err) {
        handleError(err, res, 'completeTask');
        throw err;
    }
};

const retakeTask = async (req, res = response) => {
    try {
        const { data } = await axios.patch(`${process.env.COMPLETEANDRETAKETASKS}/${req.params.id}/retake`);
        res.status(200).json({
            ok: true,
            task: data
        })
        logger.info('Task was retake', data);
    } catch (err) {
        handleError(err, res, 'retakeTask');
        throw err;
    }
};

module.exports = {
    getUncompletedTasks,
    getCompletedTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    retakeTask
}