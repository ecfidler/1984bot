const { messageEventPut, userPut, channelPut } = require('./../helpers/apiHelper');
const { getAttachments } = require('./../helpers/messageContentHelper');
const { getMentions } = require('./../helpers/messageContentHelper');


function onMessageCreate(message) {
    if (!message.member?.user) {
        return;
    }

    let replying_to = message.reference?.messageId;

    let messageAttachments = getAttachments(message);

    let mentions = getMentions(message);

    let payload = {
        "id": message.id,
        "timestamp": message.createdTimestamp,
        "content": message.cleanContent,
        "attachments": messageAttachments,
        "author": message.author.id,
        "replying_to": (replying_to ? replying_to : null),
        "channel": message.channelId,
        "edited": false,
        "deleted": false,
        "pinned": message.pinned,
        "mentions": mentions,
    };
    
    messageEventPutHandler(message, payload);
}

function messageEventPutHandler(message, payload) {
    messageEventPut(message.id, payload).catch( err => {
        console.error(err.response); // err.response = {missing_members..., missing_channels...}

        if (err.response?.status == 424) {
            let localMembers = [message.member].concat(Array.from(message.mentions.members.values()));
            let localChannels = [message.channel].concat(Array.from(message.mentions.channels.values()));

            let userRequests = err.response.data.missing_members.map( memberId => {
                return newMember(localMembers.find(member => member.id == memberId));
            });

            let channelRequests = err.response.data.missing_channels.map( channelId => {
                return newChannel(localChannels.find(channel => channel.id == channelId));
            });

            Promise.all(userRequests.concat(channelRequests)).then(
                () => {
                    messageEventPut(message.id, payload);
                }
            );
        }
    });
}

function newMember(member) {

    if (!member?.user) {
        return;
    }

    let tag = member.user.tag;

    payload = {
        "id": member.id,
        "username": member.user.username,
        "nickname": member.displayName,
        "numbers": tag.slice(tag.length-4),
        "bot": member.user.bot,
    };



    return userPut(member.user.id, payload);
}

function newChannel(channel) {

    if (!channel?.guild) {
        return;
    }

    payload = {
        "id": channel.id,
        "name": channel.name,
        "category": channel.parent?.name,
        "thread": channel.isThread(),
    }

    return channelPut(channel.id, payload);
}



module.exports = { onMessageCreate };