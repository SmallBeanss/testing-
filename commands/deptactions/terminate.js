const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const noblox = require("noblox.js");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "terminate",
      aliases: ["fire"],
      group: "miscellaneous",
      memberName: "terminate",
      description: "Logs an indivudal being terminated",
      guildOnly: false,
      args: [
        {
          type: "string",
          prompt: "Username of the individual?",
          key: "username"
        },
        {
          type: "string",
          prompt: "What department are they being terminated from?",
          key: "department"
        },
                {
          type: "string",
          prompt: "Why is the individual being terminated?",
          key: "reason"
        }
      ]
    });
  }
  hasPermission(msgObject) {

      if (msgObject.member.roles.find(role => role.name === "High Command")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name === "Internal Affairs")) {
        return true;
      }
      return "You do not have the permission to use the terminate command";
    }
  async run(msgObject, { username, department, reason }) {
 
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
      .setColor("#E74D3C")
      .setTitle("Department Action")
           .setThumbnail(avatarURL)
    .setDescription(`**${username}** has been **terminated** from the ${department} for ${reason}`)
      .setFooter(msgObject.member.displayName)
    channel.send(Embed);
       msgObject.reply(`Success! Your department action has been logged in <#997999809241829516>`);
  }
};
