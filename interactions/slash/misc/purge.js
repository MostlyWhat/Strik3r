/**
 * @file Purge command with slash command.
 * @author MostlyWhat
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ActionRowBuilder,
	Events,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require('discord.js');

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
		if (!interaction.isChatInputCommand()) return;

		if (interaction.commandName === 'purge') {
			// Create the modal
			const modal = new ModalBuilder()
				.setCustomId('myModal')
				.setTitle('My Modal');

			// Add components to modal

			// Create the text input components
			const favoriteColorInput = new TextInputBuilder()
				.setCustomId('favoriteColorInput')
				// The label is the prompt the user sees for this input
				.setLabel('What\'s your favorite color?')
				// Short means only a single line of text
				.setStyle(TextInputStyle.Short);

			const hobbiesInput = new TextInputBuilder()
				.setCustomId('hobbiesInput')
				.setLabel('What\'s some of your favorite hobbies?')
				// Paragraph means multiple lines of text.
				.setStyle(TextInputStyle.Paragraph);

			// An action row only holds one text input,
			// so you need one action row per text input.
			const firstActionRow = new ActionRowBuilder().addComponents(
				favoriteColorInput,
			);
			const secondActionRow = new ActionRowBuilder().addComponents(
				hobbiesInput,
			);

			// Add inputs to the modal
			modal.addComponents(firstActionRow, secondActionRow);

			// Show the modal to the user
			await interaction.showModal(modal);
		}
	},
};
