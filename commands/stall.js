const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stall')
		.setDescription('Replies with a Surprise!'),
	async execute(interaction) {
		await interaction.reply('Is garbage!');
	},
};