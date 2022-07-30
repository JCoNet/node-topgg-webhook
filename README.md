# node-topgg-webhook
A simple express listener to work with on node.js that recieves a vote webhook from Top.GG and responds by posting a message to a discord channel through your bot.

## How to setup
First off you need to edit index.js and fill out the following details  
- botToken = The token of your discord bot from the Discord Developer application dashboard
- guildID = The ID of the guild that you want to post the vote message to
- channelID = The ID of the channel that you want to post the vote message to
- colorCode = The color you want the embed to be in hex (eg. #000000)
- topggAuth = The authenication string you set in the top.gg webhook page
  
> These options can be found in the let config = {} on lines 9 to 15

Head to the top.gg webhook page for your bot or server and set the webhook to the ip or url of the host that you are going to host this listener on, followed by ':3000'.  
specify after that if it is a bot or server vote by adding /server or /bot after the ip or url.

> Make sure that if you are going to use an IP that you are using your public IP.
> - For server vote webhooks an example url would be https://example.com:3000/server
> - For bot vote webhooks an example url would be https://example.com:3000/bot

## Running the listener
You can choose how to start your listener within this project. This is beacause when starting the listener, it checks for and installs any missing required modules and any available updates for the modules that are already installed.
Your options are:
- npm via 'npm run npm'
- yarn via 'npm run yarn'

> To use yarn please run the following before attempting to start your listener. 'npm run install-yarn'
>   
> This will configure your machine to allow for the use of yarn.