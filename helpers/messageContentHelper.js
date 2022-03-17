function getAttachments(message) {
    attch = [];

    message.attachments.forEach( attachment => {
        attch.push({
            'msg_id': attachment.id,
            'url': attachment.url
        });
    });

    return attch;
}

function getMentions(message) {
    
    ments = [];

    message.mentions.members.forEach( member => {
        ments.push({
            'msg_id': message.id,
            'mention': member.id
        });
    });

    message.mentions.roles.forEach( role => {
        ments.push({
            'msg_id': message.id,
            'mention': role.id
        });
    });

    if (message.mentions.everyone) {
        ments.push({
            'msg_id': message.id,
            'mention': 'everyone'
        });
    }

    return ments;
}

module.exports = { getAttachments, getMentions }