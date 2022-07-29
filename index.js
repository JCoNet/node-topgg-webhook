const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
let port = 3000;

let config = {
  botToken: "",
  guildID: "",
  chanelID: "",
  topggAuth: ""
}

const Discord = require('discord.js');
const Intent = Discord.GatewayIntentBits;
const client = new Discord.Client({ intents: [
  Intent.Guilds,
  Intent.GuildMembers,
  Intent.GuildMessages
]});

client.login(config.botToken);

client.once('ready', async () => {
  app.listen(port, () => console.log(`Webook listener running on port: ${port}`));
  console.log(`Bot online as ${client.user.tag}`);
})

app.post('/handler', async (req, res) => {
  if (req.headers.authorization === config.topggAuth) {
    let guild = await client.guilds.cache.fetch(config.guildID);
  let member = await guild.members.cache.fetch(req.body.user);
  let channel = await guild.channels.cache.fetch(config.chanelID);

  let embed = new Discord.MessageEmbed()
  .setTitle("Vote")
  .setDescription("Someone voted for the server")
  .setThumbnail(member.user.displayAvatarURL({ 
    extension: 'png', forceStatic: true, size: 2048
  }))
  .addFields(
    {name: "Member", value: `${member.user.tag}`, inline: true},
  )
  .setColor("GOLD")
  .setFooter({ text: "Vote recieved on Top.GG", iconURL: "https://avatars.githubusercontent.com/u/34552786?s=280&v=4" })

  try {
    channel.send({
      content: "New Vote",    
      embeds: [embed]
    });
  } catch (err) {
    console.error(err);
  };

  res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});