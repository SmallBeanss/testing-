const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const noblox = require("noblox.js");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "demote",
      aliases: ["demotion"],
      group: "miscellaneous",
      memberName: "demote",
      description: "Logs demotion",
      guildOnly: false,
      args: [
        {
          type: "string",
          prompt: "Username of the individual?",
          key: "username"
        },
        {
          type: "string",
          prompt: "What is the rank you're demoting the individual to",
          key: "rank"
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
      return "You do not have the permission to use the demote command";
    }
  async run(msgObject, { username, rank }) {
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
    .setColor("#E74D3C")
      .setTitle("Department Action")
      .setDescription(`**${username}** has been **demoted** to ${rank}`)
      .setFooter(msgObject.member.displayName)
    channel.send(Embed);
       msgObject.reply(`Success! Your department action has been logged in <#961724829667586129>`);
  }
};
