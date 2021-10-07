modules = [
    require('./route/links'), // Links API CRUD
]

module.exports = function(app) {
    modules.forEach(install => {
        install(app)
    });
}