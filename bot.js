const http = require("http");
const express = require("express");
const app = express();
var server = require("http").createServer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
setInterval(() => {
  http.get(`stateFlow`);
}, 280000);

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const request = require("request-promise");
const path = require("path");
const config = require(path.join(__dirname, "config", "config.json"));
const client = new commando.CommandoClient({
  owner: "849853905797382145",
  commandPrefix: ";",
  unknownCommandResponse: true,
  selfbot: false,
  commandEditableDuration: 60
});

client.once("ready", () => {
  client.user.setPresence({
    game: { name: "Mayflower National Guard" },
    status: "idle"
  });
});

client.registry
  .registerGroups([
    ["mod", "Moderation commands"],
    ["icf", "ICF commands"],
    ["miscellaneous", "Miscellaneous commands"],
    ["administrator", "Administrator commands"],
    ["es", "ES commands"]
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));
let timeout = new Set();
let cdseconds = 15; // 1 Minute
client.on("message", msgObject => {
  if (msgObject.channel.id == 921234894397509685) {
    let Arguments = msgObject.content.split(" ");
    let channel = msgObject.client.guilds
      .get("921234891629285448")
      .channels.find("id", Arguments[0]);
    if (channel) {
      channel
        .fetchMessages({ around: Arguments[1], limit: 1 })
        .then(messages => {
          const fetchedMsg = messages.first();
          fetchedMsg.edit(
            "Wowzers, your command has been executed in-game on server `" +
              Arguments[2] +
              "`!"
          );
        });
    } else {
    }
  } else if (msgObject.channel.id == 921234894397509685) {
    let Arguments = msgObject.content.split(" ");
    let channel = msgObject.client.guilds
      .get("921234891629285448")
      .channels.find("id", Arguments[0]);
    let idMessage = Arguments[1];
    let JobId = Arguments[2];
    let pppeh = Arguments[3];
    let Players = Arguments[4];

    if (channel) {
      channel.fetchMessages({ around: idMessage, limit: 1 }).then(messages => {
        const fetchedMsg = messages.first();
        let embed = new Discord.RichEmbed()
          .setAuthor("")
          .setTitle(`Server ${pppeh}`)
          .setTimestamp()
          .setURL(
            `https://www.roblox.com/games/8380586202/NHC?jobId=${JobId}`
          );
        Players = Players.split("|");
        Players.forEach(m => {
          let sehbjfwjhkgetrghjjhg = m.split(":");
          embed.addField(
            sehbjfwjhkgetrghjjhg[0],
            `[Roblox Profile](https://www.roblox.com/users/${
              sehbjfwjhkgetrghjjhg[1]
            }/profile)`,
            true
          );
        });
        fetchedMsg.reply(embed);
      });
    } else {
    }
  }
});

client.login(process.env.token);