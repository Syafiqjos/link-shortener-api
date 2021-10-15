const express = require('express');
const Link = require('../models/Link');
const User = require('../models/User');

const router = express.Router();

const { handleToken } = require('./__global');
const { handleCacheGet, handleCacheSet, handleCacheMatch } = require('./__cache');

router.get('/links', async (req, res) => {
    try {
        const links = await Link.find();
        const truncatedLinks = links.map((el) => Link.truncateData(el));
        res.json({
            status: 'success',
            data: truncatedLinks
        });
    } catch(err) {
        res.json({
            status: 'error',
            data: err.message
        });
    }
});

router.get('/links/:id', async (req, res) => {
    try {
        const id = req.params.id;

        let link = JSON.parse(await handleCacheGet('link', id));
        console.log('Check Cache. -> ' + link);

        if (!link) {
            link = await Link.findById(id);
            await handleCacheSet('link', id, link);
            console.log('Not exist, then check database. -> ' + link);
        }

        res.json({
            status: 'success',
            data: Link.truncateData(link)
        });
    } catch(err) {
        res.json({
            status: 'error',
            data: err.message
        });
    }
});

router.post('/links', async (req, res) => {
    try {
        const redirect_url = req.body.redirect_url;
        const custom_url = req.body.custom_url;

        let author = null;

        const bearer = req.headers.authorization;
        if (bearer){
            const token = handleToken(bearer);
            author = await User.checkUserAuth(token);
        }

        const body = {
            redirect_url,
            custom_url,
            author
        };

        const link = new Link(body);
        await link.save();
        await handleCacheSet('link', link._id, link);

        res.json({
            status: 'success',
            data: Link.truncateData(link)
        });
    } catch(err) {
        res.json({
            status: 'error',
            data: err.message
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

        let user = null;
        const bearer = req.headers.authorization;
        if (bearer){
            const token = handleToken(bearer);
            user = await User.checkUserAuth(token);
        }

        const id = req.params.id;
        const link = await Link.findById(id);

        if (link) {
            if (link.author && user) {
                if (link.author.equals(user._id)) {
                    // Good
                } else {
                    throw Error("Cannot update someone's link.");
                }
            } else {
                throw Error('Cannot update Unathored link.');
            }
        } else {
            throw Error('Link not found.');
        }

        Link.updateOne({_id: id}, { $set: body});
        
        const newLink = link;
        newLink.redirect_url = body.redirect_url;
        newLink.custom_url = body.custom_url;

        res.json({
            status: 'success',
            data: Link.truncateData(newLink)
        });
    } catch(err) {
        res.json({
            status: 'error',
            data: err.message
        });
    }
});

router.delete('/links/:id', async (req, res) => {
    try {
        let user = null;
        const bearer = req.headers.authorization;
        if (bearer){
            const token = handleToken(bearer);
            user = await User.checkUserAuth(token);
        }

        const id = req.params.id;
        const link = await Link.findById(id);

        if (link) {
            if (link.author && user) {                
                if (link.author.equals(user._id)) {
                    // Good
                } else {
                    throw Error("Cannot delete someone's link.");
                }
            } else {
                throw Error('Cannot delete Unathored link.');
            }
        } else {
            throw Error('Link not found.');
        }

        const newLink = await Link.findByIdAndDelete(id);

        res.json({
            status: 'success',
            data: Link.truncateData(newLink)
        });
    } catch(err) {
        res.json({
            status: 'error',
            data: err.message
        });
    }
});

module.exports = router;