const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async( req, res = response ) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    })

};

const createEvent = async( req, res = response ) => {

    console.log(req.body);

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

const updateEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event do not exist with that Id'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No permissions to update this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.status(201).json({
            ok: true,
            event: updatedEvent
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Yous should contact admin'
        });
    }
};

const deleteEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event do not exist with that Id'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No permissions to delete this event'
            });
        }

        await Event.findByIdAndDelete( eventId );

        res.json({
            ok: true,
            msg: 'Event deleted'
        });
        
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