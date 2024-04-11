/**
 * @file Stall Command
 * @author MostlyWhat
 * @since 3.0.0
 * @version 3.3.0
 */

const {
	SlashCommandBuilder,
} = require('discord.js');

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName('stall')
		.setDescription('A surprise command.'),

	async execute(interaction) {
		await interaction.reply('IS GARBAGE!');
	},
};
