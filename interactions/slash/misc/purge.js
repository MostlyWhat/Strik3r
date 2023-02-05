/**
 * @file Purge command with slash command.
 * @author MostlyWhat
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Clears the specified amount of messages from the channel.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {
		// send hello world to Discord
		await interaction.reply('Hello World!');
	},
};
