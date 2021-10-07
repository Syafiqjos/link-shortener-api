module.exports = function(app){
    app.get('/api/links', (req, res) => {
        res.send('ok bg.');
    });
}