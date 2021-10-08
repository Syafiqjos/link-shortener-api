module.exports = function(app){
    app.get('/api/links', (req, res) => {
        res.send('ok bg.');
    });

    app.get('/api/links/:id', (req, res) => {
        res.send('ok bg.' + req.params.id);
    });

    app.post('/api/links', (req, res) => {
        res.send('ok bg.');
    });
    
    app.patch('/api/links/:id', (req, res) => {
        res.send('ok bg.');
    });

    app.put('/api/links/:id', (req, res) => {
        res.send('ok bg.');
    });

    app.delete('/api/links/:id', (req, res) => {
        res.send('ok bg.');
    });
    
}