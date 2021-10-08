const express = require('express');

const router = express.Router();

router.get('/links', (req, res) => {
    res.send('ok bg.');
});

router.get('/links/:id', (req, res) => {
    res.send('ok bg.' + req.params.id);
});

router.post('/links', (req, res) => {
    res.send('ok bg.');
});

router.patch('/links/:id', (req, res) => {
    res.send('ok bg.');
});

router.put('/links/:id', (req, res) => {
    res.send('ok bg.');
});

router.delete('/link/:id', (req, res) => {
    res.send('ok bg.');
});

module.exports = router;