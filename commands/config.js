const config = require('../config.json')

module.exports.run = async (client,message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You need to be an admin to use that command')
    else if (args[0] == "welcomemsg" ) {
        message.channel.send("Welcome message :  " + config.welcomemsg + "   =>   " + args[1])
        config.welcomemsg = args[1]
    }
    else if (args[0] == "prefix" ) {
        message.channel.send("Prefix :  " + config.prefix + "   =>   " + args[1])
        config.prefix = args[1]
    }
    else if (args[0] == "botchannel" ) {
        message.channel.send("Bot channel name :  " + config.botchannel + "   =>   " + args[1])
        config.botchannel = args[1]
    }
    else if (args[0] == "prefix" ) {
        message.channel.send("Username suggestion channel :  " + config.usernamech + "   =>   " + args[1])
        config.usernamech = args[1]
    }
}

module.exports.help = {
    name : "source"
}