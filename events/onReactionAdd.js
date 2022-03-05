const { reactionEventPost } = require('./../helpers/apiHelper');

function onReactionAdd(messageReaction, user) {
    let payload = {
        "user_id": parseInt(user.id),
        "msg_id": parseInt(messageReaction.message.id),
        "emoji": messageReaction.emoji.name,
        "timestamp": messageReaction.emoji.createdTimestamp,
    };
    reactionEventPost(payload);
}

module.exports = { onReactionAdd };