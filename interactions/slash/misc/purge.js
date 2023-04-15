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
		// Create the modal
		const modal = new ModalBuilder()
			.setCustomId('purgeModal')
			.setTitle('Purging Operations');

		// Add components to modal

		// Create the number of messages
		const numberOfMessagesInput = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId('numberOfMessages')
				.setLabel('Number of Messages')
				.setPlaceholder('ex. 24')
				.setMinLength(1)
				.setMaxLength(4)
				.setStyle(TextInputStyle.Short)
				.setRequired(true),
		);

		// Create the reason for purging
		const reasonInput = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId('reason')
				.setLabel('Reason')
				.setPlaceholder('Cleanup the channel...')
				.setMinLength(1)
				.setMaxLength(100)
				.setStyle(TextInputStyle.Short)
				.setRequired(true),
		);

		// Create the type 'confirm' to confirm the purging
		const confirmInput = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId('confirm')
				.setLabel('Confirm')
				.setPlaceholder('Type "confirm"')
				.setMinLength(1)
				.setMaxLength(7)
				.setStyle(TextInputStyle.Short)
				.setRequired(true),
		);

		// Add the action row to the modal
		modal.addComponents(numberOfMessagesInput, reasonInput, confirmInput);

		// Show the modal to the user
		await interaction.showModal(modal);
	},
};
