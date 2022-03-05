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

function reactionEventPost(payload) {
    axiosPost('reaction', payload);
}

function reactionEventDelete(payload) {
    axiosDelete('reaction',payload);
}

// Axios functions

function axiosPost(endpoint, payload) {
    axios.post(url+endpoint, payload, { headers: { Authorization: authString }}).catch( err => {
        console.error(err);
    });
};

function axiosPut(endpoint, payload) {
    axios.put(url+endpoint, payload, { headers: { Authorization: authString }}).catch( err => {
        console.error(err);
    });
}

function axiosPatch(endpoint, payload) {
    axios.patch(url+endpoint, payload, { headers: { Authorization: authString }}).catch( err => {
        console.error(err);
    });
}

function axiosDelete(endpoint, payload) {
    axios.delete(url+endpoint, payload, { headers: { Authorization: authString }}).catch( err => {
        console.error(err);
    });
}

module.exports = { voiceEventPost, messageEventPut, messageEventPatch, reactionEventPost, reactionEventDelete };