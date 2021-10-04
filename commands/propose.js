const ethers = require('ethers');
const { registered } = require('../modules/userWallets.js');
require('dotenv').config();

exports.run = async (client, message, args, level) => {
    try {
        const proposal_text = args.join(" ");
        const proposal_message = await message.channel.send(proposal_text);
        const filter = (reactions, user) => ['👍', '👎'].includes(reactions.emoji.name) && level === 10;
        // is the event being triggered at all?
        const collector = proposal_message.createReactionCollector({ filter, time: 1*1000*60}); // 1000ms = 1 sec
        // the bot reacting to itself is sometimes collected, sometimes not
        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.username}`);

        });
        // this throws unknown emoji error. Why?
        collector.on('end', collected => console.log(collected));
    } catch (error) {
        console.log(error);
    }
};

// exports.run = async (client, message, args, level) => {
//     try {
//         const proposal_text = args.join(" ");
//         message.channel.send(proposal_text).then(async (proposal_message) => {
//             const filter = (reactions, user) => ['👍', '👎'].includes(reactions.emoji.name);
//             const collector = proposal_message.createReactionCollector({ filter, time: 1*1000*60}); // 1000ms = 1 sec
//             await proposal_message.react('👍');
//             collector.on('collect', (reaction, user) => {
//                 console.log(`Collected ${reaction.emoji.name} from ${user.username}`);

//             });
//             collector.on('end', collected => console.log(collected));
//         })
//     } catch (error) {
//         console.log(error);
//     }

// };

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "propose",
  category: "Miscellaneous",
  description: "Create a proposal for the community to vote on.",
  usage: "propose"
};
