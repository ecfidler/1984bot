lock = 0

async function onVoiceStateUpdate(client, oldState, newState) {
    member = newState.member
    if ((lock + 60000) < Date.now()) { // block can run at most once a minute
        if (!member.user.bot) {
            channelMembers = oldState.channel.members
            guildStates = oldState.guild.voiceStates.cache

            // Testing Bloc
            console.log(newState.channel)
            console.log(channelMembers)
            console.log(guildStates)

            if (newState.channel) {
                setWatching(member.displayName)
            }
            else if (channelMembers) { 
                member = channelMembers[channelMembers.randomKey()]
                setWatching(member.displayName)
            }
            else if (guildStates) {
                member = guildStates[guildStates.randomKey()].member
                setWatching(member.displayName)
            }
            else {
                setWatching("you") // change this?
            }
            lock = Date.now()
        }
    }
}

function setWatching(name) {
    client.user.setPresence({ activities: [{ type: "WATCHING", name: name }]});
}