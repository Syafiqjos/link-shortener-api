const http = require('http');

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