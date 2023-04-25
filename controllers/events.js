const { response } = require('express');
const Event = require('../models/Event');

const getEvents = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'getEvents'
    })

};

const createEvent = async( req, res = response ) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const eventSaved = await event.save();

        res.status(201).json({
            ok: true,
            event: eventSaved
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'You should contact admin'
        });
    }
};

const updateEvent = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'updateEvent'
    })

};

const deleteEvent = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'deleteEvent'
    })

};

module.exports = {
    getEvents, 
    createEvent,
    updateEvent,
    deleteEvent
}