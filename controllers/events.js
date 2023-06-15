const { response } = require('express');
const axios = require('axios');

const getEvents = async( req, res = response ) => {

    try {

        const { data } = await axios.get('http://localhost:4004/api/events/');

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

        const { data } = await axios.post('http://localhost:4001/api/events/', { requestBody: req.body, requestUser: req.uid });

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

        const { data } = await axios.put('http://localhost:4002/api/events/update', { requestBody: req.body, requestParam: req.params.id, requestUser: req.uid });

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

        const { data } = await axios.delete(`http://localhost:4003/api/events/delete`, {
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