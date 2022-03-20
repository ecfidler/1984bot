const { channelPatch } = require('./../helpers/apiHelper');

function onChannelUpdate(oldChannel, newChannel) {

    if (!channel?.guild) {
        return;
    }

    if ((oldChannel.name == newChannel.name) && (oldChannel.category == newChannel.category)) {
        return;
    }

    payload = {
        "name": newChannel.name,
        "category": newChannel.parent?.name,
    }

    channelPatch(newChannel.id, payload);

}

module.exports = { onChannelUpdate };
