const API_VERSION = process.env.API_VERSION;

const modules = [
    require(`./routes/links`), // Links API CRUD
]

module.exports = function(app) {
    modules.forEach(router => {
        app.use(`/api/${API_VERSION}`, router);
    });
}