const { reactionEventDelete } = require('./../helpers/apiHelper');

function onReactionRemove(messageReaction, user) {
    let payload = {
        "member_id": user.id,
        "msg_id": messageReaction.message.id,
        "emoji": messageReaction.emoji.name,
    };
    console.log(payload);
    reactionEventDelete(payload);
}

module.exports = { onReactionRemove };