const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');


module.exports= {
    data: new SlashCommandBuilder()
        .setName('source')
        .setDescription('Replies with source code'),
    async execute(interaction) {
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('SourceCode')
                    .setURL('https://github.com/Harry-Power/DiscordBot')
					.setStyle('LINK'),

			);
            await interaction.reply({ ephemeral: true, components: [row] });
    },
}