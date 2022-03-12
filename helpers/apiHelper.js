const axios = require('axios').default;
const auth = require('./../auth.json');

url = 'https://api.whid.live/';
authString = `Bearer ${auth.whidapi_token}`;

function channelPut(id, payload) {
    axiosSimplePut(`channel/${id}`, payload);
}

function messageEventPut(id, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosPut(`message/${id}`,payload);
            resolve(res);
        } catch(err) {
            reject(err);
        }
    });
}

function messageEventPatch(id, payload) {
    axiosPatch(`message/${id}`, payload);
}

function voiceEventPost(payload) {
    axiosPost('voice_event', payload);
};

function reactionEventPost(payload) {
    axiosPost('reaction', payload);
}

function reactionEventDelete(payload) {
    axiosDelete('reaction', payload);
}

function userPut(id, payload) {
    axiosSimplePut(`user/${id}`, payload);
}

function userPatch(id, payload) {
    axiosPatch(`user/${id}`, payload);
}

// Axios functions

function axiosPost(endpoint, payload) {
    axios.post(url+endpoint, payload, { headers: { Authorization: authString }}).catch( err => {
        console.error(err);
    });
};

function axiosPut(endpoint, payload) {
    return new Promise(async (resolve, reject) => {
        axios.put(url+endpoint, payload, { headers: { Authorization: authString }}).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        });
    });
}

function axiosSimplePut(endpoint, payload) {
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

module.exports = { voiceEventPost, messageEventPut, messageEventPatch, reactionEventPost, reactionEventDelete, userPatch, userPut, channelPut };