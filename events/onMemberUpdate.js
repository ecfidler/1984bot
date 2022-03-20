const { userPatch } = require('./../helpers/apiHelper');

function onMemberUpdate(oldMember, newMember) {

    if (!newMember.user) {
        return;
    }

    if ((oldMember.username == newMember.username) && (oldMember.nickname == newMember.nickname)) {
        return;
    }

    let tag = newMember.user.tag;
        payload = {
            "username": newMember.user.username,
            "nickname": newMember.displayName,
            "numbers": tag.slice(tag.length-4),
        };
    
        userPatch(newMember.user.id, payload);
}

module.exports = { onMemberUpdate };