const { LOW_ROLE_NAME, MID_ROLE_NAME, HIGH_ROLE_NAME, GENERAL_ID } = require('../utilities/constants');
const { MessageEmbed } = require('discord.js');

async function updateRoles(content, guild) {
    const data = JSON.parse(content);

    const lowRole = guild.roles.cache.find(role => role.name == LOW_ROLE_NAME);
    const midRole = guild.roles.cache.find(role => role.name == MID_ROLE_NAME);
    const highRole = guild.roles.cache.find(role => role.name == HIGH_ROLE_NAME);

    await guild.members.fetch();

    console.log("//");
    console.log("high: ");
    const highMembers = guild.members.cache.filter( member => data.high.includes(member.id) );
    console.log(highMembers);
    updateMemberTierRoles(highMembers, [lowRole, midRole], highRole);
    
    console.log("mid: ");
    const midMembers = guild.members.cache.filter( member => data.mid.includes(member.id) );
    console.log(midMembers);

    updateMemberTierRoles(midMembers, [lowRole, highRole], midRole);

    console.log("low: ");
    const lowMembers = guild.members.cache.filter( member => data.low.includes(member.id) );
    console.log(lowMembers);

    updateMemberTierRoles(lowMembers, [midRole, highRole], lowRole);

    console.log("low (etc): ");
    const botMembers = guild.members.cache.filter( member => member.user.bot );
    const processedMembers = highMembers.concat(midMembers).concat(lowMembers).concat(botMembers);

    const extraMembers = guild.members.cache.difference(processedMembers);

    updateMemberTierRoles(extraMembers, [midRole, highRole], lowRole);

    await guild.channels.fetch(GENERAL_ID, { force: true }).then( channel => { // 674689826976694276 GENERAL_ID
        console.log(channel);
        channel.send({ embeds: [announcementEmbed()]});
    }).catch( err => {
        console.log(err);
    });
};

function updateMemberTierRoles(members, rolesToRemove, roleToAdd) {
    members.forEach(member => {
        console.log(`Processing member ${member.user.username}`);
        member.roles.remove(rolesToRemove)
        .then(() => {
            console.log(`Removed ${rolesToRemove.map(role => role.name)} from ${member.user.username}`)
            if (!member.roles.cache.some(role => role.id == roleToAdd.id)) {
                return member.roles.add(roleToAdd)
            } else {
                console.log('didn\'t add role ' + roleToAdd.name + ' to ' + member.user.username);
            }
        })
        .then(() => console.log(`Added ${roleToAdd.name} to ${member.user.username}`))
        .catch(console.error);
    });
}

function announcementEmbed() {
    const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("📣 Attention \"what have i done\" 📣")
        .setDescription("Your new Social Credit Scores have been released! 🎉 View yours on [whid.live/score](https://whid.live/score) and adjust your behavior as necessary 😄  We hope you have a productive and agreeable week! 📆")
        .setFooter({text: `Date Computed: ${new Date().toISOString()}`})
    return embed;
}

module.exports = { updateRoles };


