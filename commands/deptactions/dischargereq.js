const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const noblox = require('noblox.js');

module.exports = class changelog extends Command {
    constructor(client) {
        super(client, {
            name: "dischargereq",
            aliases: ["dischargerequest"],
            group: "miscellaneous",
            memberName: "dischargerequest",
            description: "Logs an individual requesting to be discharged (Resignation)",
            guildOnly: false,
            args: [
                {
                    type: "string",
                    prompt: "what's your Username?",
                    key: "username"
                },
                {
                    type: "string",
                    prompt: "Why do you want to resign?",
                    key: "date1"
                },
                {
                    type: "string",
                    prompt: "Do you hold a command or suprvisor postion?",
                    key: "date2"
                },
            ]
        });
    }

    hasPermission(msgObject) {
        if (msgObject.member.roles.find(role => role.name === "High Command")) {
            return true;
        } else if (msgObject.member.roles.find(role => role.name === "Sheriff's Office")) {
            return true;
        }
        return "You do not have permison to use this command!";
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
            .channels.find("name", "discharge-request");
        let Embed = new Discord.RichEmbed()
            .setColor("#29B9C4")
            .setTitle("Discharge Request")
  .setDescription(`**${username}** has requested to be Discharged from New Haven County Sheriff's Office
Reason: ${date1} 
Does the user hold a supervisor position
 ***${date2}***`)
            .setThumbnail(avatarURL)
            .setFooter(msgObject.member.displayName)
        channel.send(Embed);
    msgObject.reply(`Your Discharge Request has successfully been sent to HighCommand!`);
    }
};