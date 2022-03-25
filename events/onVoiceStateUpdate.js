//const { updatePresence } = require('./../helpers/presenceHelper');
const { voiceEventPost } = require('./../helpers/apiHelper');
const { newChannel, newMember } = require('./../helpers/newContextHelper');

function onVoiceStateUpdate(oldState, newState) {

    if (oldState.member.user.bot) {
        return;
    }

    // Parse and send data
    let timestamp = Date.now(); //new Date().toISOString()
    let userId = newState.member.id;
    let channel = newState.channelId;
    let type = 'join';

    if (newState.channel == null) {
        type = 'leave';
        channel = oldState.channelId;
    }
    else if ((newState.channelId != oldState.channelId) && (oldState.channelId != null)) {
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

    let payload = {
        'member_id': userId,
        'type': type,
        'channel': channel,
        'timestamp' : timestamp
    };

    voiceEventPostHandler(oldState, newState, payload);
    
};

function voiceEventPostHandler(oldState, newState, payload) {
    voiceEventPost(payload).catch( err => {
        console.error(err.response); // err.response = {missing_members..., missing_channels...}

        if (err.response?.status == 424) {
            
            let localMembers = [newState.member];
            let localChannels = [newState.channel];

            if (newState.channel != oldState.channel) {
                localChannels.push(oldState.channel);
            }

            let userRequests = err.response.data.missing_members.map( memberId => {
                return newMember(localMembers.find(member => member.id == memberId));
            });

            let channelRequests = err.response.data.missing_channels.map( channelId => {
                return newChannel(localChannels.find(channel => channel.id == channelId));
            });

            Promise.all(userRequests.concat(channelRequests)).then(
                () => {
                    voiceEventPost(payload);
                }
            );
        }
    });
}

module.exports = { onVoiceStateUpdate };