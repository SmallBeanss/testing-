const Discord = require("discord.js")
const { Command } = require("discord.js-commando")

module.exports = class ban extends Command {
    constructor(client){
        super(client, {
            name: "ban",
            aliases: [],
            description: "bans someone from server",

            memberName: "ban",
            group: "administrator",
            guildOnly: true,

            args: [
                {
                    type: "member",
                    prompt: "who are you banning?",
                    key: "person",
                },
                {
                    type: "string",
                    prompt: "why are you banning them?",
                    key: "reason",
                },
            ]
        })
    }
         hasPermission(msgObject) {
  if(msgObject.guild.id == 986671444668858478 || msgObject.guild.id == 912190621542928425){
     if (msgObject.member.roles.find(role => role.name === "Moderator")) {
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
        msgObject.member.roles.find(role => role.name == "Staff")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }
    async run(message, { person, reason }){
        message.guild.member(person).ban(reason).then(() => {
            message.reply(`successfully banned ${person.user.tag}`)
        }).catch(error => {
            message.reply(`failed to ban ${person.user.tag}\`\`\`js\n${error}\`\`\``)
            return
        })
         const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.member.displayName} has banned ${person} `);
      log.setFooter(
     `Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/992d0fe8b8ef622128a7750259f1b863.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`998012468632768663`).send(log);

    }
}