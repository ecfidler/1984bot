const axios = require('axios').default;
const auth = require('./../auth.json');

url = 'https://api.whid.live/';
authString = `Bearer ${auth.whidapi_token}`;

function channelPut(id, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosPut(`channel/${id}`, payload);
            resolve(res);
        } catch(err) {
            reject(err);
        }
    });
}

function channelPatch(id, payload) {
    axiosPatch(`channel/${id}`, payload);
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

function memberPut(id, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosPut(`member/${id}`, payload);
            resolve(res);
        } catch(err) {
            reject(err);
        }
    });
}

function memberPatch(id, payload) {
    axiosPatch(`member/${id}`, payload);
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

module.exports = { voiceEventPost, messageEventPut, messageEventPatch, reactionEventPost, reactionEventDelete, userPatch: memberPatch, userPut: memberPut, channelPut, channelPatch };