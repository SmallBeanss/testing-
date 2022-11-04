const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const noblox = require('noblox.js');

module.exports = class changelog extends Command {
    constructor(client) {
        super(client, {
            name: "loarequest",
            aliases: ["loareq"],
            group: "miscellaneous",
            memberName: "loareq",
            description: "Logs an individual requesting a leave of absence",
            guildOnly: false,
            args: [
                {
                    type: "string",
                    prompt: "what's your Username?",
                    key: "username"
                },
                {
                    type: "string",
                    prompt: "What date will your LOA start?",
                    key: "date1"
                },
                {
                    type: "string",
                    prompt: "What date will your LOA end?",
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
            .channels.find("name", "loa-request");
        let Embed = new Discord.RichEmbed()
            .setColor("#29B9C4")
            .setTitle("LOA Request")
            .setDescription(`**${username}** has requested a **Leave of Absence** from ${date1} till ${date2}`)
            .setThumbnail(avatarURL)
            .setFooter(msgObject.member.displayName)
        channel.send(Embed);
    msgObject.reply(`Your LOA Request has successfully been sent to HighCommand!`);
    }
};