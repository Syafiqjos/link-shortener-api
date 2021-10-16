const http = require('http');

/**
 * Make a http Request
 * @param {Object} options filled with http options objects, (host, port, path, headers, so on)
 * @param {string} options.hostname eg: example.com or localhost
 * @param {number} options.port eg: 8000, if null default to port 80
 * @param {string} options.path eg: /api/v1/user/example
 * @param {string} options.method eg: POST, GET, PATCH, PUT, DELETE
 * @param {Object} options.headers eg: Authorization, Content-Type, ..
 * @param {Object} toBeSent default undefined, might be required to send query or post
 * @returns {Promise} use await async to get the data
 * @type {(options: Object, toBeSent: Object) => Promise}
 */
function httpRequest(options, toBeSent) {
    if (options == undefined) {
        return null;
    }
    return new Promise((resolve, reject) => {
        const r = http.request(options, (res) => {
            let data = '';
    
            res.on('data', (d) => { data += d; });
            res.on('end', () => { resolve(data); });
        });
        
        r.on('error', (err) => {
            console.log(err.message);
            reject(err);
        });

        r.write(new TextEncoder().encode(JSON.stringify(toBeSent)));
        r.end();
    });
}

module.exports = {
    httpRequest
};