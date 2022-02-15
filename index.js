// Package imports
const { Client, Intents } = require('discord.js');

// Custom imports
const auth = require('./auth.json');
const commandManager = require('./utilities/command-manager.js');
// const { GUILDS } = require('./utilities/constants');

// Client Instance
const client = new Client(); // ADD INTENTS

// On ready
client.once('ready', () => {
	console.log('Good Morning!');
    
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

// Login
client.login(auth.token);