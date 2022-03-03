const axios = require('axios');
const auth = require('./../auth.json');

url = 'https://api.whid.live';
authString = `Bearer ${auth.whidapi_token}`;

function voiceEventPost(payload) {
    post('/voice_event',payload);
};

function post(endpoint, payload) {
    console.log(axios.post(url+endpoint, payload, { headers: { Authorization: authString }}));
};

module.exports = { voiceEventPost };