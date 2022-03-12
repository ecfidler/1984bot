const { reactionEventRemove } = require('./../helpers/apiHelper');

function onReactionRemove(messageReaction, user) {
    let payload = {
        "user_id": user.id,
        "msg_id": messageReaction.message.id,
        "emoji": messageReaction.emoji.name,
    };
    reactionEventRemove(payload);
}

module.exports = { onReactionRemove };