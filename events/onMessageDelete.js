const { messageEventPatch } = require('./../helpers/apiHelper');

function onMessageDelete(message) {
    let payload = {
        "deleted": true,
        "deleted_timestamp": Date.now(),
    }

    messageEventPatch(message.id, payload);
}

module.exports = { onMessageDelete };