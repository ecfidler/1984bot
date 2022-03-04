//const { updatePresence } = require('./../helpers/presenceHelper');
const { voiceEventPost } = require('./../helpers/apiHelper');

function onVoiceStateUpdate(client, oldState, newState) {

    if (oldState.member.user.bot) {
        return;
    }

    // Parse and send data
    let timestamp = Date.now();
    let disconnect = false;
    let userId = newState.member.id;
    let type = 'join';

    // mute+, unmute+, deaf+, undeaf+, connect, disconnect+, move+, webcamon, webcamoff, streamon, streamoff 
    if (newState.channel == null) {
        type = 'leave';
    }
    else if (newState.channelId != oldState.channelId) { // not possible
        type = 'move';
    }
    else if (newState.selfDeaf != oldState.selfDeaf) {
        if (newState.selfDeaf == true) {
            type = 'deafen';
        }
        else if (newState.selfDeaf == false) {
            type = 'undeafen';
        }
    }
    else if (newState.serverDeaf != oldState.serverDeaf) {
        if (newState.serverDeaf == true) {
            type = 'server deafen';
        }
        else if (newState.serverDeaf == false) {
            type = 'server undeafen';
        }
    }
    else if (newState.selfMute != oldState.selfMute) {
        if (newState.selfMute == true) {
            type = 'mute';
        }
        else if (newState.selfMute == false) {
            type = 'unmute';
        }
    }
    else if (newState.serverMute != oldState.serverMute) {
        if (newState.serverMute == true) {
            type = 'server mute';
        }
        else if (newState.serverMute == false) {
            type = 'server unmute';
        }
    }
    else if (newState.selfVideo != oldState.selfVideo) {
        if (newState.selfVideo == true) {
            type = 'webcam start';
        }
        else if (newState.selfVideo == false) {
            type = 'webcam stop';
        }
    }
    else if (newState.streaming != oldState.streaming) {
        if (newState.streaming == true) {
            type = 'stream start';
        }
        else if (newState.streaming == false) {
            type = 'stream stop';
        }
    }

    console.log(type);
    /*
    voiceEventPost({
        'user_id': userId,
        'type': type,
        'timestamp' : timestamp
    })
    */
};

module.exports = { onVoiceStateUpdate };