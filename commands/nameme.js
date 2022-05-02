const fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nameme')
        .setDescription('Randomise your name'),
    async execute(interaction) {
        fs.readFile('usernames.txt', 'utf8', (err, unformatedUsernames) => {
            if (err) throw err
            
            const names = unformatedUsernames.split(',')
            const nameIndex = Math.floor(Math.random() * names.length)

            interaction.member.setNickname(names[nameIndex]).then(() => {
                return interaction.reply(`Successfully changed name to **${names[nameIndex]}**`)
            }).catch(err => {
                console.error(err)
                return interaction.reply(`I was unable to change your name, I tried to change your name to ${names[nameIndex]}`)
                
            })
        })
    },
}
