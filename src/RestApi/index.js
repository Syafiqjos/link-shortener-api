const API_VERSION = 'v1';

module.exports = function(app) {
    const install = require(`./${API_VERSION}`);
    
    install(app);
}