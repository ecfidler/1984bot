const { messageEventPatch } = require('./../helpers/apiHelper');
//const { getAttachments } = require('./../helpers/attachmentHelper');

function onMessageUpdate(oldMessage, newMessage) {
    let payload = {
        "content": newMessage.cleanContent,
        "edited": (oldMessage.cleanContent != newMessage.cleanContent),
        "pinned": newMessage.pinned,
        "edited_timestamp": newMessage.editedTimestamp,
    }

    messageEventPatch(newMessage.id, payload);
}

module.exports = { onMessageUpdate };