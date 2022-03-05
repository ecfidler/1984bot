// Package imports
const { Client, Intents } = require('discord.js');

// Custom imports
const auth = require('./auth.json');
const commandManager = require('./utilities/command-manager');

const { refreshPresence } = require('./helpers/presenceHelper');

const { onVoiceStateUpdate } = require('./events/onVoiceStateUpdate');
const { onMessageUpdate } = require('./events/onMessageUpdate');
const { onMessageDelete } = require('./events/onMessageDelete');
const { onMessageCreate } = require('./events/onMessageCreate');
const { onReactionAdd } = require('./events/onReactionAdd');


const { DELAY } = require('./utilities/constants');
const { onReactionDelete } = require('./events/onReactionDelete');

// Client Instance
const client = new Client({intents: [`GUILD_MESSAGES`, `GUILD_MESSAGE_TYPING`, `GUILD_VOICE_STATES`, `GUILD_MEMBERS`, `GUILD_EMOJIS_AND_STICKERS`, `GUILDS`, `GUILD_MESSAGE_REACTIONS`]});

// On ready
client.once('ready', () => {
	//console.log('Good Morning!');
    
    // Load commands
    commandManager.loadCommands(client);

    // Set presence
    client.user.setPresence({ activities: [{ type: "WATCHING", name: "everyone" }]});

    // Start presence timeout
    setInterval(() => {
        refreshPresence(client);
    }, DELAY);
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand()) {
        commandManager.commandImports.get(interaction.commandName).action(client, interaction);
    }

    if (interaction.isContextMenu()) {
        commandManager.commandImports.get(interaction.commandName).action(client, interaction);
    }
});

client.on('guildMemberAdd', (member) => {

});

client.on('messageCreate', (message) => {
    console.log(message.id);
    onMessageCreate(client, message);
});

client.on('messageDelete', (message) => {
    onMessageDelete(client, message);
});

client.on('messageReactionAdd', (messageReaction, user) => {
    onReactionAdd(messageReaction, user);
});

client.on('messageReactionRemove', (messageReaction, user) => {
    onReactionRemove(messageReaction, user);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    onMessageUpdate(client, oldMessage, newMessage);
});

client.on('typingStart', (typing) => {

});

client.on('voiceStateUpdate', (oldState, newState) => {
    onVoiceStateUpdate(client, oldState, newState);
});

// Login
client.login(auth.token);