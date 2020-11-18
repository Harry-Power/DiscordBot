# DiscordBot
A simple discord bot

## Features
### Welcome message
The bot can send a custom message when someone joins a server
### !randomkick
Admins can kick someone at random or kick someone specific
### !nameme
Members can change their username to one from random list of usernames that members can suggest and bot owner can approve using a python script

## Installation
```
git clone https://github.com/Harry-Power/DiscordBot.git
cd DiscordBot
npm install
```
When it has finished installing use `node index.js` to start the bot

## Example configuration
```json
{
  "token": "abc123456789012345678",
  "botchannel": "bot-commands",
  "welcomechannel": "general",
  "welcomemsg": "Welcome to the server",
  "usernamech": "username-suggestions"
}
```
