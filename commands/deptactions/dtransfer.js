const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const noblox = require("noblox.js");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "dtransfer",
      aliases: ["dt"],
      group: "miscellaneous",
      memberName: "dtransfer",
      description: "Logs an indivudal transferring divisions",
      guildOnly: false,
      args: [
        {
          type: "string",
          prompt: "Username of the individual?",
          key: "username"
        },
        {
          type: "string",
          prompt: "Which division are they transferring from?",
          key: "odivision"
        },
                {
          type: "string",
          prompt: "Which division are they transferring to?",
          key: "ndivision"
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
      return "You do not have the permission to use the division transfer command";
    }
  async run(msgObject, { username, odivision, ndivision }) {
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
    .setColor("#F1C40F")
      .setTitle("Department Action")
      .setDescription(`**${username}** has **transferred** from  ${odivision} to the  ${ndivision}`)

      .setFooter(msgObject.member.displayName)
    channel.send(Embed);
       msgObject.reply(`Success! Your department action has been logged in <#961724829667586129>`);
  }
};
