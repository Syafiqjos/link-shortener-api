const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/user/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.login(email, password);
        
        if (user){
            res.json({
                status: 'success',
                data: user
            });
        } else {
            throw Error('Unknown Error.');
        }
    } catch(err) {
        res.json({
            status: 'error',
            data: err.message
        });
    }
});

router.post('/user/register', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const fullname = req.body.fullname;
        const phone = req.body.phone;

        const body = {
            email,
            password,
            fullname,
            phone
        };

        const user = await User.register(body);

        res.json({
            status: 'success',
            data: user
        });
    } catch(err) {
        res.json({
            status: 'error',
            data: err.message
        });
    }
});

router.patch('/users/:id', async (req, res) => {
    try {
        const password = req.body.password;
        const fullname = req.body.fullname;
        const phone = req.body.phone;

        const body = {
            password,
            fullname,
            phone
        };

        const id = req.params.id;

        const user = await User.findByIdAndUpdate(id, body, { new: true });
        
        res.json({
            status: 'success',
            data: user
        });
    } catch(err) {
        res.json({
            status: 'error',
            data: err.message
        });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndDelete(id);
        res.json({
            status: 'success',
            data: user
        });
    } catch(err) {
        res.json({
            status: 'error',
            data: err.message
        });
    }
});

module.exports = router;