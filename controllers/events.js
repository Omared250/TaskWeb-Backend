const { response } = require('express');
const logger = require('../winston-config');
const axios = require('axios');
require('dotenv').config();

const getEvents = async( req, res = response ) => {

    try {

        const { data } = await axios.get(process.env.GETEVENTS_MICROSERVICE);
        
        res.json({
            ok: true,
            events: data.events
        })
        
    } catch (err) {

        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'You should contact admin'
        });
        logger.error( err.response.data, { status: err.response.status, statusText: err.response.statusText, url: err.config.url } );

    }

};

const createEvent = async( req, res = response ) => {

    try {

        const { data } = await axios.post(process.env.CREATEEVENTS_MICROSERVICE, { requestBody: req.body, requestUser: req.uid });

        res.status(201).json({
            ok: true,
            event: data.event
        })
        logger.info('Event was created', data.event );

    } catch (err) {

        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'You should contact admin'
        });
        logger.error( err.response.data, { status: err.response.status, statusText: err.response.statusText, url: err.config.url } );

    }
};

const updateEvent = async( req, res = response ) => {

    try {

        const { data } = await axios.put(process.env.UPDATEEVENTS_MICROSERVICE, { requestBody: req.body, requestParam: req.params.id, requestUser: req.uid });

        res.status(201).json({
            ok: true,
            event: data.event
        })
        logger.info('Event was updated', data.event );
        
    } catch (err) {

        console.log(err);
        res.status(err.response.status).json({
            ok: false,
            msg: err.response.data.msg,
        });
        logger.error( err.response.data, { status: err.response.status, statusText: err.response.statusText, url: err.config.url } );

    }
};

const deleteEvent = async( req, res = response ) => {

    try {

        const { data } = await axios.delete(process.env.DELETEEVENTS_MICROSERVICE, {
            params: {
                id: req.params.id,
                uid: req.uid
            }
        });

        res.status(201).json({
            ok: true,
            event: 'Event Deleted'
        })
        logger.info('Event was deleted', data );
        
    } catch (err) {

        console.log(err);
        res.status(err.response.status).json({
            ok: false,
            msg: err.response.data.msg,
        });
        logger.error( err.response.data, { status: err.response.status, statusText: err.response.statusText, url: err.config.url } );

    }
};

module.exports = {
    getEvents, 
    createEvent,
    updateEvent,
    deleteEvent
}