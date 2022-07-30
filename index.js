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
  colorCode: "",
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

app.post('/server', async (req, res) => {
  if (req.headers.authorization === config.topggAuth) {
    let guild = await client.guilds.fetch(config.guildID);
    let member = await guild.members.fetch(req.body.user);
    let channel = await guild.channels.fetch(config.chanelID);

    let embed = new Discord.MessageEmbed()
      .setTitle("New Server Vote")
      .setDescription(`${member.displayName} just voted for ${guild.name} on top.gg!`)
      .setAuthor({name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ 
        extension: 'png', forceStatic: true, size: 2048
      })}`})
      .setThumbnail(guild.iconURL({ 
        extension: 'png', forceStatic: true, size: 2048
      }))
      .setColor(config.colorCode)
      .setFooter({ text: "Vote recieved on Top.GG", iconURL: "https://avatars.githubusercontent.com/u/34552786?s=280&v=4" });

    try {
      channel.send({
        content: ":arrow_up:",    
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

app.post('/bot', async (req, res) => {
  if (req.headers.authorization === config.topggAuth) {
    let guild = await client.guilds.fetch(config.guildID);
    let member = await guild.members.fetch(req.body.user);
    let channel = await guild.channels.fetch(config.chanelID);

    let bot = await client.users.cache.fetch(req.body.bot);

    let embed = new Discord.MessageEmbed()
      .setTitle("New Bot Vote")
      .setAuthor({name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ 
        extension: 'png', forceStatic: true, size: 2048
      })}`})
      .setThumbnail(bot.user.displayAvatarURL({ 
        extension: 'png', forceStatic: true, size: 2048
      }))
      .setColor(config.colorCode)
      .setFooter({ text: "Vote recieved on Top.GG", iconURL: "https://avatars.githubusercontent.com/u/34552786?s=280&v=4" });

    if (req.body.isWeekend == true) {
      embed.setDescription(`${member.displayName} just voted for ${bot.user.name} on top.gg! This counted as 2 votes!`)
    } else {
      embed.setDescription(`${member.displayName} just voted for ${bot.user.name} on top.gg!`)
    }

    try {
      channel.send({
        content: ":arrow_up:",    
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