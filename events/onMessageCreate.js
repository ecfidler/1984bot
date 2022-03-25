const { messageEventPut } = require('./../helpers/apiHelper');
const { getAttachments } = require('./../helpers/messageContentHelper');
const { getMentions } = require('./../helpers/messageContentHelper');
const { newChannel, newMember } = require('./../helpers/newContextHelper');


async function onMessageCreate(message) {
    if (!message.member?.user) {
        return;
    }

    let replying_to = message.reference?.messageId;

    if (replying_to) {
        await message.channel.messages.fetch(replying_to).then( msg => {
            replying_to = msg.author.id;
        }).catch( err => {
            console.error(err);
        });
    }
    


    let messageAttachments = getAttachments(message);

    let mentions = getMentions(message);

    let payload = {
        "id": message.id,
        "timestamp": message.createdTimestamp,
        "content": message.cleanContent,
        "attachments": messageAttachments,
        "author": message.author.id,
        "replying_to": replying_to,
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

module.exports = { onMessageCreate };