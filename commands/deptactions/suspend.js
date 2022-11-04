const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const noblox = require("noblox.js");

module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "suspend",
      aliases: ["sus"],
      group: "miscellaneous",
      memberName: "suspend",
      description: "Logs an individual being suspended",
      guildOnly: false,
      args: [
        {
          type: "string",
          prompt: "Username of the individual?",
          key: "username"
        },
        {
          type: "string",
          prompt: "What date are you suspending the individual?",
          key: "date1"
        },
        {
          type: "string",
          prompt: "What date will the individual be unsuspended?",
          key: "date2"
        },
      ]
    });
  }
  hasPermission(msgObject) {

      if (msgObject.member.roles.find(role => role.name === "High Command")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name === "Internal Affairs")) {
        return true;
      }
      return "You do not have the permission to use the suspend command";
    }
  async run(msgObject, { username, date1, date2 }) {
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
    .setColor("#11806A")
      .setTitle("Internal Affairs Action")
      .setDescription(`**${username}** has been **suspended** from ${date1} - ${date2}
      
      Contact IA Command if seen on team.`)
      .setFooter(msgObject.member.displayName)
    channel.send(Embed);
       msgObject.reply(`Success! Your department action has been logged in <#997999809241829516>`);
  }
};
