/*
    User's routes / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

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

router.get('/renew', revalidateToken);

module.exports = router;