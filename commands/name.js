const fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports= {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('Change the name of a user')
        .addUserOption(option => option.setName('target').setDescription('The member to name')),
    async execute(interaction) {
        const user = interaction.options.getMember('target');
        if (!interaction.member.permissions.has('ADMINISTRATOR')){
            return interaction.reply('You need Administrator to use this')
        }
        fs.readFile('usernames.txt', 'utf8',(err, unformatedUsernames) => {
            if (err) throw err
            const names = unformatedUsernames.split(',')
            const nameIndex = Math.floor(Math.random() * names.length)
            user
                .setNickname(names[nameIndex])
                .then(() => {
                    return interaction.reply(`Successfully changed name to **${names[nameIndex]}**`)
                })
                .catch(err => {
                    console.error(err)
                    return interaction.reply(`I was unable to change your name, I tried to change your name to ${names[nameIndex]}`)          
                })
        })
    }
}






// module.exports.run = async (client,message, args, person) => {
//     console.log("yes")
//     if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('Nice try')
//     if (!person) return message.reply('No user mentioned')

//     fs.readFile('usernames.txt', 'utf8', function (err, unformatedUsernames) {
//         if (err) throw err
//         const names = unformatedUsernames.split(',')
//         const nameMeName = Math.floor(Math.random() * names.length)
//         console.log(nameMeName+1 + '/' + names.length + ': ' + names[nameMeName])
//         person
//             .setNickname(names[nameMeName])
//             .then(() => {
//                 // We let the message author know we were able to kick the person
//                 message.reply(`Successfully changed name to **${names[nameMeName]}**`)
//             })
//             .catch(err => {
//                 message.reply(`I was unable to change your name, I tried to change your name to ${names[nameMeName]}`)
//                 console.error(err)
//             })
//     })
// }

// module.exports.help = {
//     name : "name"
// }