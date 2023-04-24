/*
    User's routes / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { fieldValidator } = require('../middlewares/field-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwt-validator');

router.post(
    '/new',
    [ // middlewares
        check('name', 'The name is mandatory').not().isEmpty(),
        check('email', 'The email is mandatory').isEmail(),
        check('password', 'The password should have 6 characters at least').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser);

router.post(
    '/',
    [ // middlewares
        check('email', 'The email is mandatory').isEmail(),
        check('password', 'The password should have 6 characters at least').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;