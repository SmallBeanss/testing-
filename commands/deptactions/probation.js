const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const noblox = require("noblox.js");

module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "probation",
      aliases: ["probate"],
      group: "miscellaneous",
      memberName: "probation",
      description: "Logs probation",
      guildOnly: false,
      args: [
        {
          type: "string",
          prompt: "Username of the individual?",
          key: "username"
        },
        {
          type: "string",
          prompt: "What is the rank you're setting their probation for?",
          key: "rank"
        },
                {
          type: "string",
          prompt: "How many days is the user being placed on probation?",
          key: "day"
        }
      ]
    });
  }
  hasPermission(msgObject) {

      if (msgObject.member.roles.find(role => role.name === "High Command")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      }
      return "You do not have the permission to use the probation command";
    }
  async run(msgObject, { username, rank, day }) {
 const userid = await noblox.getIdFromUsername(username);
        const thumbnail = await noblox.getPlayerThumbnail(userid, 50, "png", false, "headshot");
        let avatarURL;

      let i;
        for (i = 0; i < thumbnail.length; i++) {
            if (thumbnail[i].targetId === userid) {
                avatarURL = thumbnail[i].imageUrl
            }
        }
    let channel = this.client.guilds
      .get("986671444668858478")
      .channels.find("name", "department-logs");
    let Embed = new Discord.RichEmbed()
      .setThumbnail(avatarURL)
    .setColor("#3498DB")
      .setTitle("Department Action")
      .setDescription(`**${username}** is now a probationary ${rank} for the next ${day} days`)

      .setFooter(msgObject.member.displayName)
    channel.send(Embed);
       msgObject.reply(`Success! Your department action has been logged in <#V>`);
  }
};
