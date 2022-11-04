const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const noblox = require('noblox.js');

module.exports = class changelog extends Command {
    constructor(client) {
        super(client, {
            name: "setloa",
            aliases: ["sl"],
            group: "miscellaneous",
            memberName: "setloa",
            description: "Logs an individual being placed on LOA",
            guildOnly: false,
            args: [
                {
                    type: "string",
                    prompt: "Username of the individual?",
                    key: "username"
                },
                {
                    type: "string",
                    prompt: "What date is the individual going on LOA",
                    key: "date1"
                },
                {
                    type: "string",
                    prompt: "What date will the individual be off of LOA",
                    key: "date2"
                },
            ]
        });
    }

    hasPermission(msgObject) {
        if (msgObject.member.roles.find(role => role.name === "High Command")) {
            return true;
        } else if (msgObject.member.roles.find(role => role.name === "Admin")) {
            return true;
        }
        return "You do not have the permission to use the setLOA command";
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
            .setColor("#29B9C4")
            .setTitle("Department Action")
            .setDescription(`**${username}** has been placed on **Leave of Absence** from ${date1} till ${date2}`)
            .setThumbnail(avatarURL)
            .setFooter(msgObject.member.displayName)
        channel.send(Embed);
        msgObject.reply(`Success! Your department action has been logged in <#997999809241829516>`);
    }
};