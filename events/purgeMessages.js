/**
 * @file Modal Interaction Handler
 * @author MostlyWhat
 * @since 3.2.0
 * @version 3.3.1
 */

const { InteractionType } = require('discord-api-types/v10');
const {
	ActionRowBuilder,
	Events,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require('discord.js');

module.exports = {
	name: 'interactionCreate',

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author MostlyWhat
	 * @param {import('discord.js').Interaction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

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
