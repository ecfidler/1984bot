const { reactionEventPost } = require('./../helpers/apiHelper');

function onReactionAdd(messageReaction, user) {
    let payload = {
        "user_id": user.id,
        "msg_id": messageReaction.message.id,
        "emoji": messageReaction.emoji.name,
        "timestamp": Date.now(),
    };
    reactionEventPost(payload);
}

module.exports = { onReactionAdd };