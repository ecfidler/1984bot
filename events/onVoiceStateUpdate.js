const delay = 15000;

lock = 0

function onVoiceStateUpdate(client, oldState, newState) {
    updatePresence(client, newState.member);
    // Parse and send data
}

function updatePresence(client, member) {
    if ((lock + delay) < Date.now()) { // block can run at most once a minute => 60000
        if (!member.user.bot) {
            activeVoice = member.guild.members.cache.filter(member => member.voice.channel != null) // guild members connected to a voice channel

            if (member.voice.channel != null) { // activeVoice.has(member.id) // Check if target member is still connected
                setWatching(client, member.displayName);
            }
            else if (activeVoice.size) { // Look for other members connected to voice
                member = activeVoice.random();
                setWatching(client, member.displayName);
            }
            else { // Fall back to waiting
                setWatching(client, "for activity..."); // change this?
                return; // Don't reset the lock on a fallback
            }
            lock = Date.now();
        }
    }
}

function refreshPresence(client) {
    if ((lock + delay) < Date.now()) {
        activeVoice = client.guilds.cache.random().members.cache.filter(member => ((member.voice.channel != null) && (member.user.bot != true)));

        if (activeVoice.size) {
            setWatching(client, activeVoice.random().member.displayName);
        }
        else {
            setWatching(client, "for activity...");
        }
    }
}

function setWatching(client, name) {
    client.user.setPresence({ activities: [{ type: "WATCHING", name: name }]});
}

module.exports = { onVoiceStateUpdate, refreshPresence };

/*
function updatePresence(client, newState) { // rework to take in a member, not a state... and check their voice state.
    member = newState.member;
    if ((lock + 15000) < Date.now()) { // block can run at most once a minute 60000
        if (!member.user.bot) {
            channelMembers = newState.channel?.members; // members connected to the event's channel
            activeVoice = newState.guild.members.cache.filter(member => member.voice.channel != null) // guild members connected to a voice channel

            if (newState.channel) {
                setWatching(client, member.displayName);
            }
            else if (channelMembers) { 
                member = channelMembers.random();
                setWatching(client, member.displayName);
            }
            else if (activeVoice.size) {
                member = activeVoice.random();
                setWatching(client, member.displayName);
            }
            else {
                setWatching(client, "for activity..."); // change this?
            }
            lock = Date.now();
        }
    }
}
*/