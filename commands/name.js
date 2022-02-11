const fs = require('fs')

module.exports.run = async (client,message, args, person) => {
    console.log("yes")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Nice try')
    if (!person) return message.reply('No user mentioned')

    fs.readFile('usernames.txt', 'utf8', function (err, unformatedUsernames) {
        if (err) throw err
        const names = unformatedUsernames.split(',')
        const nameMeName = Math.floor(Math.random() * names.length)
        console.log(nameMeName+1 + '/' + names.length + ': ' + names[nameMeName])
        person
            .setNickname(names[nameMeName])
            .then(() => {
                // We let the message author know we were able to kick the person
                message.reply(`Successfully changed name to **${names[nameMeName]}**`)
            })
            .catch(err => {
                message.reply(`I was unable to change your name, I tried to change your name to ${names[nameMeName]}`)
                console.error(err)
            })
    })

}

module.exports.help = {
    name : "name"
}