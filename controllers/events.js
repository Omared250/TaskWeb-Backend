const { response } = require('express');
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
        })
    }

};

const createEvent = async( req, res = response ) => {

    try {

        const { data } = await axios.post(process.env.CREATEEVENTS_MICROSERVICE, { requestBody: req.body, requestUser: req.uid });

        res.status(201).json({
            ok: true,
            event: data.event
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'You should contact admin'
        });
    }
};

const updateEvent = async( req, res = response ) => {

    try {

        const { data } = await axios.put(process.env.UPDATEEVENTS_MICROSERVICE, { requestBody: req.body, requestParam: req.params.id, requestUser: req.uid });

        res.status(201).json({
            ok: true,
            event: data.event
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Yous should contact admin'
        });

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
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Yous should contact admin'
        });

    }
};

module.exports = {
    getEvents, 
    createEvent,
    updateEvent,
    deleteEvent
}