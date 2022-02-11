const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const fs = require('fs')
const prefix = config.prefix;
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err , files) => {
  if(err) console.error(err);
  
  let jsfiles = files.filter(f => f.split(".").pop() == "js");
  if(jsfiles.length <= 0) {
    console.log("No commands to load");
    return;
  } 

  console.log(`Loading ${jsfiles.length} commands`);

  jsfiles.forEach((f, i)=> {
    let props =require(`./commands/${f}`);
    console.log(`${i+1}: ${f} loaded`)
    client.commands.set(props.help.name,props);
  })
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(config.customclienttag)
})
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === config.welcomechannel)
  // Do nothing if the channel wasn't found on this server
  // Send the welcome message
  channel.send(config.welcomemsg)
  fs.readFile('usernames.txt', 'utf8', function (err, unformatedUsernames) {
    if (err) throw err
    const names = unformatedUsernames.split(',')
    const nameMeName = Math.floor(Math.random() * names.length)
    console.log(nameMeName+1 + '/' + names.length + ': ' + names[nameMeName])
    member
      .setNickname(names[nameMeName])
      .then(() => {
        // We let the message author know we were able to kick the person
        message.reply(`Successfully changed name to **${names[nameMeName]}**`)
      })
      .catch(err => {
        // An error happened
        // This is generally due to the bot not being able to name the member,
        // either due to missing permissions or role hierarchy
        message.reply(`I was unable to change your name, I tried to change your name to ${names[nameMeName]}`)
        // Log the error
        console.error(err)
      })
  })
})

client.on('message', message => {
  if (message.guild === null) return;
  if (message.channel.name === config.usernamech) {
    if (message.content.startsWith('-')) return
    fs.appendFile('username-temp.txt', ',' + message.content, function (err) {
      if (err) throw err
      console.log('usernames updated!')
    })
  };
  let role = message.guild.roles.cache.find(r => r == message.mentions.roles.first())
  
  if (!role) {
  } else {
    if (role == message.guild.roles.cache.find(r => r.name == config.role)) {
      role.setMentionable(false)
        .then(updated => console.log(`Role mentioning disabled for ${updated.name}`))
        .catch(console.error);
  
      setTimeout(function() { 
        role.setMentionable(true)
          .then(updated => console.log(`Role mentioning enabled for ${updated.name}`))
          .catch(console.error);
  
      },config.rolespamtime * 60 * 1000)
    }
  }
  
  if (!message.content.startsWith(prefix) || message.author.bot) return
  const args = message.content.slice(prefix.length).trim().split(' ')
  const command = args.shift().toLowerCase()
  const person = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(args[0]))
  console.log(command)
  let cmd = client.commands.get(command)
  console.log(cmd)
  if(cmd) cmd.run(client, message, args, person);

})

client.login(config.token)
