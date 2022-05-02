const config = require('../config.json')

module.exports.run = async (client,message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('You need to be an admin to use that command')
    else if (args[0] == "welcomemsg" ) {
        if (!args[1]) message.channel.send("Current Welcomd Message: " + config.welcomemsg)
        else {
            message.channel.send("Welcome message :  " + config.welcomemsg + "   =>   " + args[1])
            config.welcomemsg = args[1]
        }
    }
    else if (args[0] == "prefix" ) {
        if (!args[1]) message.channel.send("Current Prefix: " + config.prefix)
        else {
            message.channel.send("Prefix :  " + config.prefix + "   =>   " + args[1])
            config.prefix = args[1]
        }
    }
    else if (args[0] == "botchannel" ) {
        if (!args[1]) message.channel.send("Current Bot Channel: " + config.botchannel)
        else {
            message.channel.send("Bot channel name :  " + config.botchannel + "   =>   " + args[1])
            config.botchannel = args[1]
        }
    }
    
    else if (args[0] == "usernamech" ) {
        if (!args[1]) message.channel.send("Current Username Suggestion Channel: " + config.usernamech)
        else {
            message.channel.send("Username suggestion channel :  " + config.usernamech + "   =>   " + args[1])
            config.usernamech = args[1]
        }
    }
    console.log(config)
}

module.exports.help = {
    name : "config"
}