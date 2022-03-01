const { PRESENCE_OPTIONS } = require('./../utilities/constants')

function refreshPresence(client) {
        let activeVoices = getActiveVoices(client);

        if (activeVoices.length) {
            setWatching(client, randomVoice(activeVoices).displayName);
        }
        else {
            setFallbackPresence(client);
        }
}

function getActiveVoices(client) {
    let voices = []
    client.guilds.cache.forEach(guild => {
        voices.push(...guild.members.cache.filter(member => member.voice.channel != null && member.user.bot != true))
    });
    return voices;
}

function setFallbackPresence(client) {
    let [type, text] = randomChoice(PRESENCE_OPTIONS);
    setWatching(client, text, type);
}

function setWatching(client, name, type = "WATCHING") {
    client.user.setPresence({ activities: [{ type: type, name: name }] });
}

function randomVoice(voices) {
    return randomChoice(voices)[1];
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports = { refreshPresence, updatePresence };