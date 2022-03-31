const { LOW_ROLE_NAME, MID_ROLE_NAME, HIGH_ROLE_NAME } = require('../utilities/constants');

async function updateRoles(message) {
    const data = JSON.parse(message.content);

    const lowRole = message.guild.roles.cache.find(role => role.name == LOW_ROLE_NAME);
    const midRole = message.guild.roles.cache.find(role => role.name == MID_ROLE_NAME);
    const highRole = message.guild.roles.cache.find(role => role.name == HIGH_ROLE_NAME);

    const tierRoles = [lowRole, midRole, highRole];

    await message.guild.members.fetch();

    console.log("//");
    console.log("high: ");
    const highMembers = message.guild.members.cache.filter( member => data.high.includes(member.id) );
    updateMemberTierRoles(highMembers, [lowRole, midRole], highRole);
    
    console.log("mid: ");
    const midMembers = message.guild.members.cache.filter( member => data.mid.includes(member.id) );
    updateMemberTierRoles(midMembers, [lowRole, highRole], midRole);

    console.log("low: ");
    const lowMembers = message.guild.members.cache.filter( member => data.low.includes(member.id) );
    updateMemberTierRoles(lowMembers, [midRole, highRole], lowRole);

    console.log("low (etc): ");
    const botMembers = message.guild.members.cache.filter( member => member.user.isBot );
    const processedMembers = highMembers.concat(midMembers).concat(lowMembers).concat(botMembers);

    const extraMembers = message.guild.members.cache.difference(processedMembers);

    updateMemberTierRoles(extraMembers, [midRole, highRole], lowRole);
    

};

function updateMemberTierRoles(members, rolesToRemove, roleToAdd) {
    members.forEach(member => {
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

module.exports = { updateRoles };


