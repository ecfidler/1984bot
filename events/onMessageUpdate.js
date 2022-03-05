const { messageEventPatch } = require('./../helpers/apiHelper');
const { getAttachments } = require('./../helpers/attachmentHelper');

function onMessageUpdate(client, oldMessage, newMessage) {
    let payload = {
        "content": newMessage.cleanContent,
        "edited": (oldMessage.cleanContent == newMessage.cleanContent),
        "pinned": newMessage.pinned,
        "edited_timestamp": newMessage.editedTimestamp,
    }

    /*
    if (newMessage.attachments.size != oldMessage.attachments.size) {
        payload = Object.assign(payload, {
            'attachments': getAttachments(newMessage),
        })
    }
    */

    messageEventPatch(newMessage.id, payload);
}

module.exports = { onMessageUpdate };