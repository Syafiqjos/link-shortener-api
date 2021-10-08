module.exports = function(app){
    const API_VERSION = process.env.API_VERSION;
    const PATH_ROUTE = `/api/${API_VERSION}/links`;
    const PATH_ROUTE_ID = `/api/${API_VERSION}/links/:id`;

    app.get(PATH_ROUTE, (req, res) => {
        res.send('ok bg.');
    });

    app.get(PATH_ROUTE_ID, (req, res) => {
        res.send('ok bg.' + req.params.id);
    });

    app.post(PATH_ROUTE, (req, res) => {
        res.send('ok bg.');
    });
    
    app.patch(PATH_ROUTE_ID, (req, res) => {
        res.send('ok bg.');
    });

    app.put(PATH_ROUTE_ID, (req, res) => {
        res.send('ok bg.');
    });

    app.delete(PATH_ROUTE_ID, (req, res) => {
        res.send('ok bg.');
    });
    
}