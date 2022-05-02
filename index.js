const Discord = require('discord.js')
const { Client, Intents, Collection } = require('discord.js');
//const myIntents = new Intents(8);
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const config = require('./config.json')
const fs = require('fs')
const prefix = config.prefix;


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(config.customclienttag)
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

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

client.on('messageCreate', message => {

  if (message.guild === null) return;
  if (message.channel.id === config.usernamech) {
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
  user = message.mentions.members.first()||null

  console.log(command)
  let cmd = client.commands.get(command)
  console.log(cmd)
  if(cmd) cmd.run(client, message, args, user);

})

client.login(token)
