const commando = require('discord.js-commando');
class PurgeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'administrator', // like your !roll command
            memberName: 'purge',
            description: 'Purges specified messages in a channel',
            args: [
                {
                    key: 'numToPurge',
                    label: 'number',
                    prompt: 'How many messages would you like to delete?',
                    type: 'integer'
                }
            ]
        });
    }
  
hasPermission(msgObject) {
  if(msgObject.guild.id == 986671444668858478 || msgObject.guild.id == 867863166691180604){
     if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "High Command")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Moderator")
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
    run(msg, { numToPurge }) {
        let channel = msg.channel;

        // fail if number of messages to purge is invalid
        if (numToPurge <= 0) {
            return msg.reply('You must specify a number above 0');
        }

        // channel type must be text for .bulkDelete to be available
        else if (channel.type === 'text') {
            return channel.fetchMessages({limit: numToPurge})
                .then(msgs => channel.bulkDelete(msgs))
                .then(msgs => msg.reply (`🙏 Successfully deleted ${msgs.size} messages!`))
                .catch(console.error);
        }
        else {
            return msg.reply('Sorry ☹️ You must use this command in a text channel!');
        }
    }
};

module.exports = PurgeCommand