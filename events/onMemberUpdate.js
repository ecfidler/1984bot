const { memberPatch } = require('./../helpers/apiHelper');

function onMemberUpdate(oldMember, newMember) {

    if (!newMember.user) {
        return;
    }

    if (
        (oldMember.username == newMember.username) &&
        (oldMember.nickname == newMember.nickname) &&
        (oldMember.numbers == newMember.numbers)
    ) {
        return;
    }

    let tag = newMember.user.tag;
    payload = {
        "username": newMember.user.username,
        "nickname": newMember.displayName,
        "numbers": tag.slice(tag.length-4),
    };
    
    memberPatch(newMember.user.id, payload);
}

module.exports = { onMemberUpdate };