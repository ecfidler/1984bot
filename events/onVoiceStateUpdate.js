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
        type = 'disconnect';
    }
    else if (newState.channelId != oldState.channelId) { // not possible
        type = 'move';
    }
    else if (newState.selfDeaf != oldState.selfDeaf) {
        if (newState.selfDeaf == true) {
            type = 'selfDeaf';
        }
        else if (newState.selfDeaf == false) {
            type = 'unselfDeaf';
        }
    }
    else if (newState.serverDeaf != oldState.serverDeaf) {
        if (newState.serverDeaf == true) {
            type = 'serverDeaf';
        }
        else if (newState.serverDeaf == false) {
            type = 'unServerDeaf';
        }
    }
    else if (newState.selfMute != oldState.selfMute) {
        if (newState.selfMute == true) {
            type = 'selfMute';
        }
        else if (newState.selfMute == false) {
            type = 'unSelfMute';
        }
    }
    else if (newState.serverMute != oldState.serverMute) {
        if (newState.serverMute == true) {
            type = 'serverMute';
        }
        else if (newState.serverMute == false) {
            type = 'unServerMute';
        }
    }
    else if (newState.selfVideo != oldState.selfVideo) {
        if (newState.selfVideo == true) {
            type = 'webcamOn';
        }
        else if (newState.selfVideo == false) {
            type = 'webcamOff';
        }
    }
    else if (newState.serverDeaf != oldState.serverDeaf) {
        if (newState.serverDeaf == true) {
            type = 'serverDeaf';
        }
        else if (newState.serverDeaf == false) {
            type = 'unServerDeaf';
        }
    }
    else if (newState.streaming != oldState.streaming) {
        if (newState.streaming == true) {
            type = 'streamingOn';
        }
        else if (newState.streaming == false) {
            type = 'streamingOff';
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