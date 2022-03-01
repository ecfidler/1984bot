const { updatePresence } = require('./../helpers/presenceHelper')

function onVoiceStateUpdate(client, oldState, newState) {
    updatePresence(client, newState.member);
    // Parse and send data
};

module.exports = { onVoiceStateUpdate };