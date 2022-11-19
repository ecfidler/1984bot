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
        '̷̳̿̋ͅA̵̢̦̓͒ť̷̤̦t̴̯̏e̶̩͑͗n̵̰̾t̵̺͠ͅī̷̬o̵̧͔̐ń̷̞̀ ̴̜͆̎"̷̯͝w̴̦͖͋̆h̶͈̤̐̀a̵̖̐͋ť̷̠̳͛ ̴̪̅͗h̴͈͒a̵̝̔v̷̩́e̵̢̲͋͠ ̸̡̝̈́͝i̵̪̖̒ ̷̙̾͋d̵̠̈́o̵̤̒ṋ̸͋e̸͍̬͆͑"̸͓͒ ',
        "oh god what have i done",
        "w̴̦͖͋̆h̶͈̤̐̀a̵̖̐͋ť̷̠̳͛ ̴̪̅͗h̴͈͒a̵̝̔v̷̩́e̵̢̲͋͠ ̸̡̝̈́͝i̵̪̖̒ ̷̙̾͋d̵̠̈́o̵̤̒ṋ̸͋e̸͍̬͆͑",
        "what have i done..............",
        "w̸̝̓ḣ̵̨å̴̙t̷̻͋ ̶̲̐h̴̲͂a̵̖̐v̷͔̅e̶̘͋ ̸̣̌ĩ̶̪ ̶̻̓d̵̤̆o̷̥͛n̶͚̚e̸̘̎..............",
        "what have you done",
        "w̵̥̿̽h̷́͜a̵̩͒͆͜ť̸̥̈ ̸̙̾h̶̳̐̕a̸̦̲̓v̶̰̻̈͝ẽ̶̪ ̵͙̓̀y̴͙̱̐͝ö̸̙̏u̸̿͠ͅ ̴̂ͅḏ̶͔̊ó̷̪n̵̙͑e̴̳̩̍",
        "ATTENTION",
        "♋︎⧫︎⧫︎♏︎■︎⧫︎♓︎□︎■︎ ⬥︎♒︎♋︎⧫︎ ♒︎♋︎❖︎♏︎ ♓︎ ♎︎□︎■︎♏︎", // 'Attention "what have i done"'
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

    "社会信\n大好きですね？\nおちんちん\n\nー[安倍晋三](https://whid.live/score)",
    "Social Credit Scores[nYou can see yours on the site](https://whid.live/score)\nDo not be afraid",
    "Y̴̚ͅȯ̵̞u̷̹̓ŗ̸̍ ̴̥͐n̶̛̮è̷͈w̷̯͌ ̸͕͋S̷͚̏o̶̓ͅč̷̘ì̶ͅȃ̷̟l̸͙̓ ̶̖̏C̷̪̐r̸͇̄è̶̝d̷̹͠ì̷̟ẗ̷́͜ ̷̞̓S̴̗̄c̸̳̀o̵̺̐r̴̹̔e̷̥̅š̷̳ ̶̦̃ĥ̸͕a̸̻̓v̶̘͠e̶͎̾ ̸͜͠b̵͙̓e̷̹͂ĕ̷̟ň̴̟ ̵̞̂r̵̈ͅe̵̥̒l̴̚ͅè̸͖a̶̜̔s̸̡̒e̶̜͝d̸̝̕!̵͓͋ 😶‍🌫️ ̶̦̈́ ̸̥͆V̴͉̅ȋ̶̪e̵̯̎ẅ̵̻́ ̵̞́y̶̮̆o̸̙̚u̵̯̽r̴̭̄s̶̙̃ ̸̣̓o̶͙͝n̶̳̔ ̴͓̊[ẁ̸̢h̴̼͝i̷̮͊d̷̨͑.̶͕̀l̵͕̏ḯ̷̜v̵͖̔e̵̞̽/̷̧̃ś̵̫c̴͎͌ő̶̺r̶̝̈́e̶͉̒](https://whid.live/score) ̵̝͝à̶̜n̸͕͂d̷̦͑ ̸̮̂ã̸͎d̸́͜j̴̘͘u̴͈͊ş̶̓t̵̺̑ ̴̉͜y̵̱̍ô̵̰u̷̡͒r̵̭̋ ̵̛̹b̴̯́ë̶̺h̶͔͆ḁ̸͐v̶̡̈́i̴̬͆o̵͓̓r̶̪͝ ̶̙̚a̴̭̋s̷̞̔ ̴̟͊n̶͕̂è̸̺c̶̪̀e̷̙̔s̶̨̕s̵̮͝ǎ̶̧r̶̤͝y̷̗̋ 😶‍🌫️ ̸̖̀ ̷̢͊ ̷̠̾W̶̻̅e̶̗͌ ̸̌͜h̴͎̅o̴̜͝p̴͔͝ȩ̸̾ ̷͉̚y̶̝͛ó̵ͅu̶̞̍ ̶̣͆h̷̯̒á̴̫v̶̆ͅȇ̵̹ ̴͓̒a̶̖͝ ̴̪̂p̷̬̈́r̵̹͋ò̶͔ḍ̸̂ù̴͜c̸̘͐ṫ̵̜ì̵̦v̷̥̐e̸̱͠ ̶̟̓a̴̩̎n̷̫̓d̵̝̿ ̴͇͌a̷̕͜g̴̡͋r̴̫̀e̷̖͊e̵̞͝a̵̼̕b̸͈͘ḷ̸̿é̷̯ ̶̨̒w̸̞̍e̴̦̓ẻ̸ͅk̸͔̎!̸͉͑ 😶‍🌫️",
    "Has your new Social Credit score been released? Can you view it on [whid.live/score](https://whid.live/score) and adjust your behavior? Can you have a productive and agreeable week?",
    "⍓︎□︎︎◆︎︎❒︎︎ ■︎︎♏︎︎⬥︎︎ ⬧︎□︎︎♍︎︎♓︎︎♋︎︎●︎︎ ♍︎❒︎︎♏︎︎♎︎︎♓︎︎⧫︎︎ ⬧︎♍︎︎□︎︎❒︎︎♏︎︎⬧︎︎ ♒︎︎♋︎︎❖︎︎♏︎︎ ♌︎︎♏︎︎♏︎︎■︎︎ ❒︎︎♏︎︎●︎︎♏︎︎♋︎︎⬧︎︎♏︎︎♎︎︎✏︎︎ 🎉❖︎♓︎︎♏︎︎⬥︎︎ ⍓︎︎□︎︎◆︎︎❒︎︎⬧︎︎ □︎︎■︎︎ [⬥︎︎♒︎︎♓︎︎♎︎︎📬︎︎●︎︎♓︎︎❖︎︎♏︎︎📭︎︎⬧︎︎♍︎︎□︎︎❒︎︎♏︎︎](https://whid.live/score) ♋︎︎■︎︎♎︎︎ ♋︎︎♎︎︎🙰◆︎︎⬧︎︎⧫︎︎ ⍓︎︎□︎︎◆︎︎❒︎︎ ♌︎︎♏︎︎♒︎︎♋︎︎❖︎︎♓︎︎□︎︎❒︎︎ ♋︎︎⬧︎︎ ■︎︎♏︎︎♍︎︎♏︎︎⬧︎︎⬧︎︎♋︎︎❒︎︎⍓︎︎ 😄 ⬥︎♏︎︎ ♒︎︎□︎︎◻︎︎♏︎︎ ⍓︎︎□︎︎◆︎︎ ♒︎︎♋︎︎❖︎︎♏︎︎ ♋︎︎ ◻︎︎❒︎︎□︎︎♎︎︎◆︎︎♍︎︎⧫︎︎♓︎︎❖︎︎♏︎︎ ♋︎︎■︎︎♎︎︎ ♋︎︎♑︎︎❒︎︎♏︎︎♏︎︎♋︎︎♌︎︎●︎︎♏︎︎ ⬥︎︎♏︎︎♏︎︎🙵✏︎︎ 📆",
    "🎉🎉🎉[#1 Victory Royale](https://whid.live/score)🎉🎉🎉\n😱😱😱💀💀💀",
];
const getFooters = () => [
    `Dȃ̷̟te Cô̵̰mpute̶̜͝d̸̝̕: ${new Date().toISOString()}`,
    `Datè̷͈ Compu̷̹̓ted: 1970-01-01T00:00:00.000Z`,
    `Date Cô̵̰mpuṫ̵̜ed: 2022-04-01T16:24:54.397Z`,
    `Da̵̼̕te Comput̸̰͊ed̷͔̈: 2027-03-23-01T22:35:01.100Z`,
    `Datè̷͈ Compooped: ${new Date().toISOString()}`,
];

// const presets = [
//     {
//         color: "RED",
//         title: "",
//         description: "",
//         footer: "",
//     },
//     {
//         color: "BLACK",
//         title: ZERO_WIDTH_SPACE,
//         description: ZERO_WIDTH_SPACE,
//         footer: "",
//     },
// ];

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
            channel.send({ embeds: [announcementEmbed()] });
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

function announcementEmbed() {
    // const embed = new MessageEmbed()
    //     .setColor("RED")
    //     .setTitle('📣 Attention "what have i done" 📣')
    //     .setDescription(
    //         "Your new Social Credit Scores have been released! 🎉 View yours on [whid.live/score](https://whid.live/score) and adjust your behavior as necessary 😄  We hope you have a productive and agreeable week! 📆"
    //     )
    //     .setFooter({ text: `Date Computed: ${new Date().toISOString()}` });

    const embed = new MessageEmbed()
        .setColor(choose(colors))
        .setTitle(getTitle())
        .setDescription(choose(description))
        .setFooter(choose(getFooters()));
    return embed;
}

module.exports = { updateRoles };
