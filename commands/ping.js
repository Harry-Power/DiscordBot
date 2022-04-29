module.exports.run = async (client,message, args) => {
    message.reply({content:'Pong!', ephemeral: true })
    console.log('pinged')
}

module.exports.help = {
    name : "ping"
}