function getAttachments(message) {
    attch = []

    message.attachments.forEach(attachment => {
        attch.push({
            'msg_id': parseInt(attachment.id),
            "url": attachment.url
        });
    });

    return attch;
}

module.exports = { getAttachments }