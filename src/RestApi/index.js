const API_VERSION = process.env.API_VERSION;

module.exports = function(app) {
    const install = require(`./${API_VERSION}`);
    
    install(app);
}