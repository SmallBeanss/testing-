const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const noblox = require("noblox.js");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "recwarningia",
      aliases: ["rwia"],
      group: "miscellaneous",
      memberName: "recwarningia",
      description: "Logs recorded warning from Internal Affairs",
      guildOnly: false,
      args: [
        {
          type: "string",
          prompt: "Username of the individual?",
          key: "username"
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
      return "You do not have the permission to use the recwarning command";
    }
  async run(msgObject, { username}) {
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
      .setDescription(`**${username}** has recieved a **recorded warning** as a result of an IA Investigation`)

      .setFooter(msgObject.member.displayName)
    channel.send(Embed);
       msgObject.reply(`Success! Your department action has been logged in <#961724829667586129>`);
  }
};
