const { reactionEventPost } = require('./../helpers/apiHelper');

function onReactionAdd(messageReaction, user) {
    let payload = {
        "member_id": user.id,
        "msg_id": messageReaction.message.id,
        "emoji": messageReaction.emoji.name,
        "timestamp": Date.now(),
    };
    console.log(payload);
    reactionEventPost(payload);
}

module.exports = { onReactionAdd };