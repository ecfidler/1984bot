const { MessageAttachment } = require("discord.js");

async function dmRetrival(message) {
    await message.guild.members.fetch();

    await getContent(message.guild.members.cache).then(async (res) => {
        console.log(res);
        const file = new MessageAttachment(
            Buffer.from(JSON.stringify(res)),
            "messages.json"
        );
        await message.reply({ content: "results", files: [file] });
    });
}

async function getContent(memberCache) {
    return new Promise(async (resolve, reject) => {
        try {
            let resp = await Promise.all(
                memberCache.map(async (m) => {
                    let data = [];
                    await m
                        .createDM()
                        .then(async (dm) => {
                            await dm.messages.fetch().then((res) => {
                                data = res.map((message) => ({
                                    content: message.content,
                                    attachments: message.attachments.map(
                                        (a) => a.url
                                    ),
                                }));
                                // return res;
                            });
                        })
                        .catch(() => {});
                    return { member: m.displayName, messages: data };
                })
            );

            resolve(resp);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { dmRetrival };

// console.log(cache);
// for await (let m of cache) {
//     console.log(m);
//     await m
//         .createDM()
//         .then(async (dm) => {
//             await dm.messages.fetch().then((res) => {
//                 let data = res.map((message) => message.content);
//                 resp.push(data);
//             });
//         })
//         .catch(() => {});
// }

// cache.forEach(async (m) => {
//     m.createDM()
//         .then(async (dm) => {
//             await dm.messages.fetch().then((res) => {
//                 // let data = res.map((message) => message.content);
//                 resp.push(res);
//             });
//         })
//         .catch(() => {});
// });
