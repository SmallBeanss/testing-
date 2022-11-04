const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "changelog",
      aliases: ["cl"],
      group: "administrator",
      memberName: "changelog",
      description: "Posts a change log to the change log channel",
      ownerOnly: false,
      args: [
        {
          type: "string",
          prompt: "What is the Description?",
          key: "description"
        }
      ]
    });
  }
hasPermission(msgObject) {
  if(msgObject.guild.id == 986671444668858478 || msgObject.guild.id == 912190621542928425){
     if (msgObject.member.roles.find(role => role.name === "High Command")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Admin")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Moderator")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Developer!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("986671444668858478")
      .channels.find("id", "998012468632768663");
    let Embed = new Discord.RichEmbed()
      .setTitle(`**__Change Log__**`)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
      .setFooter("State of Mayflower","https://cdn.discordapp.com/emojis/925482021374025828.webp?size=96&quality=lossless")
      .setTimestamp();
    channel.send(Embed);
    msgObject.reply("This command is disabled!")
  }
};
