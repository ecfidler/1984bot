const { MessagePayload } = require('discord.js');
const { messageEventPut } = require('./../helpers/apiHelper');

function onMessageCreate(client, message) {
    let replying_to = message.reference?.messageId;

    let messageAttachments = [];

    message.attachments.forEach(attachment => {
        messageAttachments.push({
            'msg_id': parseInt(attachment.id),
            "url": attachment.url 
        });
    });

    let payload = {
        "id": parseInt(message.id, 10),
        "timestamp": message.createdTimestamp,
        "content": message.cleanContent,
        "attachments": messageAttachments,
        "author": parseInt(message.author.id),
        "replying_to": parseInt(replying_to ? replying_to : -1),
        "channel": parseInt(message.channelId),
        "edited": false,
        "deleted": false,
        "pinned": message.pinned
    };
    
    messageEventPut(message.id, payload);
}

module.exports = { onMessageCreate };