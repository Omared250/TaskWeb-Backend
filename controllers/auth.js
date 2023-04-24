const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email});
        
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exist with the same email'
            });
        };

        user = new User( req.body );

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'You should contact Admin'
        })
    }
};

const loginUser = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User/Password are not correct'
            });
        };
        
        // confirm password
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'User/Password are not correct'
            });
        }

        // Generate Token

        res.json({
            ok: true,
            uid: user.id,
            name: user.name
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'You should contact Admin'
        })

    }
};

const revalidateToken = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
};

module.exports = {
    createUser,
    loginUser,
    revalidateToken,
};