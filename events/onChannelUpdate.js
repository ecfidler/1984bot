const { channelPatch } = require('./../helpers/apiHelper');

function onChannelUpdate(oldChannel, newChannel) {

    if (!newChannel?.guild) {
        return;
    }

    if ((oldChannel.name == newChannel.name) && (oldChannel.category == newChannel.category)) {
        return;
    }

    let cat = newChannel.parent?.name

    payload = {
        "name": newChannel.name,
        "category": cat ? cat : null
    }

    channelPatch(newChannel.id, payload);

}

module.exports = { onChannelUpdate };
