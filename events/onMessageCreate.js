const { messageEventPut, userPut, channelPut } = require('./../helpers/apiHelper');
const { getAttachments } = require('./../helpers/attachmentHelper');


function onMessageCreate(message) {
    let replying_to = message.reference?.messageId;

    let messageAttachments = getAttachments(message);

    let mentions = getMentions(message.mentions);

    let payload = {
        "id": message.id,
        "timestamp": message.createdTimestamp,
        "content": message.cleanContent,
        "attachments": messageAttachments,
        "author": message.author.id,
        "replying_to": (replying_to ? replying_to : -1),
        "channel": message.channelId,
        "edited": false,
        "deleted": false,
        "pinned": message.pinned,
        "mentions": mentions,
    };
    
    messageEventPut(message.id, payload).then( res => {

        console.log(res);

        if (!res.data.user_exists) {
            newUser(message.member);
        }
        if (!res.data.channel_exists) {
            newChannel(message.channel);
        }
    }).catch( err => {
        console.error(err);
    });
}

function newUser(member) {

    let tag = member.user.tag;

    payload = {
        "id": member.id,
        "username": member.user.username,
        "nickname": member.displayName,
        "numbers": tag.slice(tag.length-4),
    };

    userPut(member.user.id, payload);
}

function newChannel(channel) {

    if (!channel?.guild) {
        return;
    }

    payload = {
        "id": channel.id,
        "name": channel.name,
        "category": channel.parent.name,
        "thread": channel.isThread(),
    }

    channelPut(channel.id, payload);
}

function getMentions(mentions) {
    return Array.from(mentions.users.keys()) + Array.from(mentions.roles.keys()); // CHECK THIS PLS;
}

module.exports = { onMessageCreate };