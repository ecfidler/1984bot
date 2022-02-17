// Package imports
const { Client, Intents } = require('discord.js');

// Custom imports
const auth = require('./auth.json');
const commandManager = require('./utilities/command-manager.js');
// const { GUILDS } = require('./utilities/constants');

// Client Instance
const client = new Client({intents: [`GUILD_MESSAGES`, `GUILD_MESSAGE_TYPING`, `GUILD_VOICE_STATES`, `GUILD_MEMBERS`, `GUILD_EMOJIS_AND_STICKERS`]});

// On ready
client.once('ready', () => {
	//console.log('Good Morning!');
    
    // Load commands
    commandManager.loadCommands(client);

    // Set presence
    //client.user.setPresence({ activities: [{ type: "LISTENING", name: "the rain" }]});
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

})

client.on('messageCreate', (message) => {

})

client.on('messageDelete', (message) => {

})

client.on('messageReactionAdd', (messageReaction, user) => {

})

client.on('messageReactionRemove', (messageReaction, user) => {

})

client.on('messageUpdate', (oldMessage, newMessage) => {

})

client.on('typingStart', (typing) => {

})

client.on('voiceStateUpdate', (oldState, newState) => {

})

// Login
client.login(auth.token);