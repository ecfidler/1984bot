const axios = require('axios');
const auth = require('./../auth.json');

url = 'https://api.whid.live/';
authString = `Bearer ${auth.whidapi_token}`;

function messageEventPut(id, payload) {
    axiosPut(`message/${id}`,payload);
}

function messageEventPatch(id, payload) {
    axiosPatch(`message/${id}`,payload);
}

function voiceEventPost(payload) {
    axiosPost('voice_event',payload);
};

// Axios functions

function axiosPost(endpoint, payload) {
    axios.post(url+endpoint, payload, { headers: { Authorization: authString }});
};

function axiosPut(endpoint, payload) {
    axios.put(url+endpoint, payload, { headers: { Authorization: authString }}).then( (res) => {
        console.log(res);
    }).catch( err => {
        console.error(err);
    });
}

function axiosPatch(endpoint) {
    axios.patch(url+endpoint, { headers: { Authorization: authString }});
}

module.exports = { voiceEventPost, messageEventPut };