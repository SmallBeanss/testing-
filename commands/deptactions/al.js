const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const noblox = require("noblox.js");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "adminleave",
      aliases: ["al"],
      group: "miscellaneous",
      memberName: "adminleave",
      description: "Logs an individual being placed on administrative leave",
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
      } else if (msgObject.member.roles.find(role => role.name === "MIS")) {
        return true;
      }
      return "You do not have the permission to use the admin leave command";
    }

  async run(msgObject, { username }) {
 
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
      .get("1036003772247322694")
      .channels.find("name", "department-logs");
    let Embed = new Discord.RichEmbed()
      .setColor("#206694")
      .setTitle("Internal Affairs Action")
      .setDescription(`**${username}** has been placed on **Administrative Leave** 
      
      Contact IA Command if seen on team.`)
      .setThumbnail(avatarURL)
      .setFooter(msgObject.member.displayName)
    channel.send(Embed);
       msgObject.reply(`Success! Your department action has been logged in <#961724829667586129>`);
  }
};
