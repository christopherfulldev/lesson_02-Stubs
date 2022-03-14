'use strict'
const  https = require('https');
const serviceRequest = {
    makeRequest: async function (url) {
        return new Promise((resolve, reject) => {
            return https.get(url, response => {
                  response.on('data', data => resolve(JSON.parse(data)));
                  response.on('error', reject);
            })
        })
    }
};

module.exports = serviceRequest;