const express = require('express');
const Link = require('../models/Link');
const User = require('../models/User');

const router = express.Router();

router.get('/links', async (req, res) => {
    try {
        const links = await Link.find();
        res.json({
            status: 'success',
            data: links
        });
    } catch {
        res.json({
            status: 'error',
            data: null
        });
    }
});

router.get('/links/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const link = await Link.findById(id);
        res.json({
            status: 'success',
            data: link
        });
    } catch {
        res.json({
            status: 'error',
            data: null
        });
    }
});

router.post('/links', async (req, res) => {
    try {
        const redirect_url = req.body.redirect_url;
        const custom_url = req.body.custom_url;
        const author_id = req.body.author_id;

        const author = await User.findById(author_id);

        const body = {
            redirect_url,
            custom_url,
            author
        };

        const link = new Link(body);
        await link.save();

        res.json({
            status: 'success',
            data: link
        });
    } catch {
        res.json({
            status: 'error',
            data: null
        });
    }
});

router.patch('/links/:id', async (req, res) => {
    try {
        const redirect_url = req.body.redirect_url;
        const custom_url = req.body.custom_url;

        const body = {
            redirect_url,
            custom_url
        };

        const id = req.params.id;

        const link = await Link.findByIdAndUpdate(id, body, { new: true });
        
        res.json({
            status: 'success',
            data: link
        });
    } catch {
        res.json({
            status: 'error',
            data: null
        });
    }
});

router.delete('/links/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const link = await Link.findByIdAndDelete(id);
        res.json({
            status: 'success',
            data: link
        });
    } catch {
        res.json({
            status: 'error',
            data: null
        });
    }
});

module.exports = router;