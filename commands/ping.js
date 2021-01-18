module.exports.run = async (client,message, args) => {
    message.reply('Pong!')
    console.log('pinged')
}

module.exports.help = {
    name : "ping"
}