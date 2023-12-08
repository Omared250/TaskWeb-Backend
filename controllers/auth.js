const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const logger = require('../winston-config');


const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email});
        
        if ( user ) {
            logger.error({ ok: false, msg: 'User already exist with the same email', status: 400 });
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

        // Generate Token
        const token = await generateJWT( user.id, user.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        logger.info('User created correctly')


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'You should contact Admin'
        })
        logger.error({ status: error.response.status, statusText: error.response.statusText, url: error.config.url });
    }
};

const loginUser = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if ( !user ) {
            logger.error({ ok: false, msg: 'User/Password are not correct', status: 400 });
            return res.status(400).json({
                ok: false,
                msg: 'User/Password are not correct'
            });
        };
        
        // confirm password
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            logger.error({ ok: false, msg: 'User/Password are not correct', status: 400 });
            return res.status(400).json({
                ok: false,
                msg: 'User/Password are not correct'
            });
        }

        // Generate Token
        const token = await generateJWT( user.id, user.name );

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'You should contact Admin'
        })
        logger.error({ status: error.response.status, statusText: error.response.statusText, url: error.config.url });

    }
};

const revalidateToken = async( req, res = response ) => {

    const { uid, name } = req

    // generate a new token and return it
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        uid,
        name,
        token
    })
    logger.info('Toke revalidated')
};

module.exports = {
    createUser,
    loginUser,
    revalidateToken,
};