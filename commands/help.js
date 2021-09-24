const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with Help!'),
	async execute(interaction, client) {
		await interaction.reply({ content:"Hi",ephemeral: true });
	},
};
