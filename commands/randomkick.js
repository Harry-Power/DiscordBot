const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');


module.exports= {
    data: new SlashCommandBuilder()
        .setName('randomkick')
        .setDescription('Randomly kick a user'),
    async execute(interaction) {
        const user =  interaction.guild.members.cache.random().user
        if (!interaction.member.permissions.has('ADMINISTRATOR')){
            setTimeout(() => {
                interaction.member.kick('Tried to use Randomkick');
            }, 3000)
            return interaction.reply('Randomly kicking you')
        }

        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
                .setCustomId('confirmkick')
                .setLabel('Yes')
                .setStyle('DANGER')

			)
            .addComponents(
				new MessageButton()
                .setCustomId('cancelkick')
                .setLabel('No')
                .setStyle('SECONDARY')

			);

        return interaction.reply({content: 'Are you sure you want to start randomkick?', components: [row]})

    }  
}









// module.exports.run = async (client,message, args, person) => {
//     const user = message.guild.members.cache.random().user
//     if (!message.member.permissions.has('ADMINISTRATOR')){
//         message.reply('Randomly kicking you')
//         setTimeout(function() {
//         message.member.kick('They asked for it')
//     }, 3000)
//     } else if (person) {
//         person
//             .kick('They were the chosen one')
//             .then(() => {
//             // We let the message author know we were able to kick the person
//                 message.reply(`Randomly kicked ${user.username}`)
//             })
//     }   
    
//     else if (user) {
//         let filter = m => m.author.id === message.author.id
//         message.channel.send(`Are you sure to randomkick? \`YES\` / \`NO\``).then(() => {
//         message.channel.awaitMessages(filter, {
//             max: 1,
//             time: 30 * 1000,
//             errors: ['time']
//             })
//             .then(message => {
//             message = message.first()
//             if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
//                 const member = message.guild.member(user)
//                 // If the member is in the guild
//                 if (member) {
//                     member
//                     .kick('They were the chosen one')
//                     .then(() => {
//                         message.reply(`Randomly kicked ${user.username}`)
//                     })
//                     .catch(err => {
//                         message.reply(`I was unable to kick the member, I tried to kick ${user.tag}`)
//                         console.error(err)
//                     })
//                 } else {
//                     // The mentioned user isn't in this guild
//                     message.reply("I choose a user that isn't in this server!")
//                 }
//             } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
//                 message.channel.send(`Cancelled`)
//             } else {
//                 message.channel.send(`Cancelled`)
//             }
//             })
//             .catch(collected => {
//                 message.channel.send('You took too long to repsond');
//             });
//         })
//     } 
// }


 
// module.exports.help = {
//     name : "randomkick"
// }
