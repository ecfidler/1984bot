const { messageEventPatch } = require('./../helpers/apiHelper');

function onMessageDelete(client, message) {
    let payload = {
        "deleted": true,
        "edited_timestamp": newMessage.editedTimestamp,
    }

    messageEventPatch(message.id, payload);
}

module.exports = { onMessageDelete };