const {
    LOW_ROLE_NAME,
    MID_ROLE_NAME,
    HIGH_ROLE_NAME,
    GENERAL_ID,
} = require("../utilities/constants");
const { MessageEmbed } = require("discord.js");
const { choose } = require("../utilities/choose");

const ZERO_WIDTH_SPACE = "​"; // I promise it's there

const craziness = 0.5;

const colors = ["RED", 0xeebbbb, 0xff0000, 0x550000, 0x550011, 0xecf];

const getTitle = () => {
    const emojis =
        "📣 🫥 😷 🐼 🕵️ 👨‍🏭 ☠ 🧤 😈 🪡 👮 🎠 🪰 😱 🧊 🌄 🏚️ 🫂 ⌛ 📴 🇷🇸 🪆 ⚠️ 🚫 📵 🚷 🌀 🚼 🔜 🃏 ⚕️ 🏺 ⚱️ 🔏 ❤️‍🔥 🚢 🗽 📡 🪬 🪫 🧿 🦠 ♟️ ⛓️ 🗝️ 🌫️ 🦷 🗜️ 🎚️ 🎛️ 📻 📼 📟 🎞️ 😶‍🌫️ 🖲️ 🦌 🕋".split(
            " "
        );
    const text = [
        'Attention "what have i done"',
        "oh god what have i done",
        "on god what have i done",
        "what have i done..............",
        "what have you done",
        "ATTENTION",
        '"enod i evah tahw" noitnettA',
    ];

    const left_and_right_emojis =
        Math.random() < craziness
            ? [choose(emojis), choose(emojis)]
            : Array(2).fill(choose(emojis));

    const output = `${left_and_right_emojis[0]} ${choose(text)} ${
        left_and_right_emojis[1]
    }`;
    return output;
};

const description = [
    `New social credit scores. ${choose([
        "😷",
        "😔",
        "😪",
        "🥱",
        "😴",
    ])} Go to [whid.live/score](https://whid.live/score). ${choose([
        "😪",
        "🥱",
        "😴",
        "😶",
        "😮‍💨",
    ])} Adjust your behavior as necessary. ${choose([
        "😷",
        "😔",
        "😪",
        "🤢",
    ])}  See you next week. ${choose(["☠", "😭", "🪦"])}`,

    `Your new Social Credit Scores have been released! 🎉 View yours on [whid.live/score](${choose(
        [
            "https://www.sbnation.com/a/17776-football",
            "https://youtu.be/dQw4w9WgXcQ",
            "https://example.com/",
            "https://pointerpointer.com/",
            "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e7/Stal.ogg/revision/latest?cb=20111126010545",
        ]
    )}) and adjust your behavior as necessary 😄  We hope you have a productive and agreeable week! 📆`,

    "Social Credit Scores\n[You can see yours on the site](https://whid.live/score)\nOk",

    "Has your new Social Credit score been released? Can you view it on [whid.live/score](https://whid.live/score) and adjust your behavior? Can you have a productive and agreeable week?",
    
    "🎉🎉🎉[#1 Victory Royale](https://whid.live/score)🎉🎉🎉\n😱😱😱💀💀💀",
];

const getFooters = () => [
    `Date Computed: ${new Date().toISOString()}`,
    `Date Computed: 1970-01-01T00:00:00.000Z`,
    `Date Computed: 2022-04-01T16:24:54.397Z`,
    `Date Computed: 2027-03-23T22:35:01.100Z`,
    `Date Compooped: ${new Date().toISOString()}`,
];

async function updateRoles(content, guild) {
    const data = JSON.parse(content);

    const lowRole = guild.roles.cache.find(
        (role) => role.name == LOW_ROLE_NAME
    );
    const midRole = guild.roles.cache.find(
        (role) => role.name == MID_ROLE_NAME
    );
    const highRole = guild.roles.cache.find(
        (role) => role.name == HIGH_ROLE_NAME
    );

    await guild.members.fetch();

    console.log("//");
    console.log("high: ");
    const highMembers = guild.members.cache.filter((member) =>
        data.high.includes(member.id)
    );
    console.log(highMembers);
    updateMemberTierRoles(highMembers, [lowRole, midRole], highRole);

    console.log("mid: ");
    const midMembers = guild.members.cache.filter((member) =>
        data.mid.includes(member.id)
    );
    console.log(midMembers);

    updateMemberTierRoles(midMembers, [lowRole, highRole], midRole);

    console.log("low: ");
    const lowMembers = guild.members.cache.filter((member) =>
        data.low.includes(member.id)
    );
    console.log(lowMembers);

    updateMemberTierRoles(lowMembers, [midRole, highRole], lowRole);

    console.log("low (etc): ");
    const botMembers = guild.members.cache.filter((member) => member.user.bot);
    const processedMembers = highMembers
        .concat(midMembers)
        .concat(lowMembers)
        .concat(botMembers);

    const extraMembers = guild.members.cache.difference(processedMembers);

    updateMemberTierRoles(extraMembers, [midRole, highRole], lowRole);

    await guild.channels
        .fetch(GENERAL_ID, { force: true })
        .then((channel) => {
            // 674689826976694276 GENERAL_ID
            console.log(channel);
            channel.send({ embeds: [buildAnnouncementEmbed()] });
        })
        .catch((err) => {
            console.log(err);
        });
}

function updateMemberTierRoles(members, rolesToRemove, roleToAdd) {
    members.forEach((member) => {
        console.log(`Processing member ${member.user.username}`);
        member.roles
            .remove(rolesToRemove)
            .then(() => {
                console.log(
                    `Removed ${rolesToRemove.map((role) => role.name)} from ${
                        member.user.username
                    }`
                );
                if (
                    !member.roles.cache.some((role) => role.id == roleToAdd.id)
                ) {
                    return member.roles.add(roleToAdd);
                } else {
                    console.log(
                        "didn't add role " +
                            roleToAdd.name +
                            " to " +
                            member.user.username
                    );
                }
            })
            .then(() =>
                console.log(
                    `Added ${roleToAdd.name} to ${member.user.username}`
                )
            )
            .catch(console.error);
    });
}

function buildAnnouncementEmbed() {
    const embed = new MessageEmbed()
        .setColor(choose(colors))
        .setTitle(getTitle())
        .setDescription(choose(description))
        .setFooter(choose(getFooters()));
    return embed;
}

module.exports = { updateRoles };
