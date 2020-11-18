const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const fs = require('fs')

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
    console.log(nameMeName + '/' + names.length + ' ' + names[nameMeName])
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
    console.log(member)
  })
})

client.on('message', message => {
  if (message.content.startsWith('-')) return
  if (message.channel.name === config.usernamech) {
    fs.appendFile('username-temp.txt', ',' + message.content, function (err) {
      if (err) throw err
      console.log('usernames updated!')
    })
  };

  if (message.content === 'ping' || message.content === 'Ping') {
    message.reply('Pong!')
    console.log('pinged')
  }
  prefix = config.prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return
  const args = message.content.slice(prefix.length).trim().split(' ')
  const command = args.shift().toLowerCase()
  // Create an event listener for new guild members
  const person = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(args[0]))
  //The most important line of code
  if (command == 'source') {
    message.reply("https://github.com/Harry-Power/DiscordBot")
  }
  //  Array.from(message.member.guild.members);
  else if (command == 'name') {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Nice try fag')
    if (!person) return message.reply('No user mentioned')
    fs.readFile('usernames.txt', 'utf8', function (err, unformatedUsernames) {
      if (err) throw err
      const names = unformatedUsernames.split(',')
      const nameMeName = Math.floor(Math.random() * names.length)
      console.log(nameMeName + '/' + names.length + ' ' + names[nameMeName])
      person
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
  }

  // Ignore messages that aren't from a guild
  // If the message content starts with "!randomkick"
  else if (command == 'randomkick') {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You need to be an admin to use that command')
    if (person) {
      person
        .kick('They were the chosen one')
        .then(() => {
        // We let the message author know we were able to kick the person
          message.reply(`Randomly kicked ${user.username}`)
        })
      return
    }
    const user = message.guild.members.cache.random().user
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user)
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('They were the chosen one')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Randomly kicked ${user.username}`)
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply(`I was unable to kick the member, I tried to kick ${user.tag}`)
            // Log the error
            console.error(err)
          })
      } else {
        // The mentioned user isn't in this guild
        message.reply("I choose a user that isn't in this server!")
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("I didn't find a user")
    }
  }
  // Ignore messages that aren't from a guild
  // If the message content starts with "!nameme"
  else if (command == 'nameme') {
    if (message.channel.name === config.botchannel) {
      fs.readFile('usernames.txt', 'utf8', function (err, unformatedUsernames) {
        if (err) throw err
        console.log('OK: ' + 'usernames.txt')
        console.log(unformatedUsernames)
        const names = unformatedUsernames.split(',')
        const nameMeName = Math.floor(Math.random() * names.length)
        console.log(nameMeName + '/' + names.length + ' ' + names[nameMeName])
        message.member
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
    } else {
      message.reply('Please use <#' + message.guild.channels.cache.find(ch => ch.name === config.botchannel) + '>')
    };
  }
})

client.login(config.token)
