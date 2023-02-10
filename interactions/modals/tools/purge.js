const { EmbedBuilder } = require('discord.js');

module.exports = {
	id: 'purgeModal',
	async execute(interaction) {
		const numberOfMessages =
			interaction.fields.getTextInputValue('numberOfMessages');

		const reason = interaction.fields.getTextInputValue('reason');

		const confirm = interaction.fields.getTextInputValue('confirm');

		// Not a Number or Less than 0 Failed Embed
		const failedToInputNumberEmbed = new EmbedBuilder()
			.setTitle('Purging Operation Failed')
			.setDescription('Purging Details')
			.addFields(
				{ name: 'Number of Messages', value: numberOfMessages, inline: true },
				{ name: 'Reason', value: reason, inline: true },
				{
					name: 'Reason of Failure',
					value: 'Not a number or less than/equal to 0',
					inline: true,
				},
			)
			.setFooter({
				text: 'Executed by ' + interaction.user.tag,
			})
			.setColor('Red')
			.setTimestamp();

		// Confirmation Failed Embed
		const failedToConfirmEmbed = new EmbedBuilder()
			.setTitle('Purging Operation Failed')
			.setDescription('Purging Details')
			.addFields(
				{ name: 'Number of Messages', value: numberOfMessages, inline: true },
				{ name: 'Reason', value: reason, inline: true },
				{
					name: 'Reason of Failure',
					value: 'Confirmation text not equal to "confirm"',
					inline: true,
				},
			)
			.setFooter({
				text: 'Executed by ' + interaction.user.tag,
			})
			.setColor('Red')
			.setTimestamp();

		// Check if the number of messages is a number and more than 0
		if (isNaN(numberOfMessages) || numberOfMessages < 1) {
			await interaction.reply({
				content: 'Purging Operation Failed',
				embeds: [failedToInputNumberEmbed],
				ephemeral: true,
			});
			return;
		}

		if (confirm !== 'confirm') {
			await interaction.reply({
				content: 'Purging Operation Failed',
				embeds: [failedToConfirmEmbed],
				ephemeral: true,
			});
			return;
		}

		// Try to delete the messages, if failed then collect the error message and set it to the variable reasonOfFailure and output the error message through failedEmbed
		try {
			await interaction.channel.bulkDelete(numberOfMessages);
		}
		catch (error) {
			// set error to the var reasonOfFailure and make it a string
			const reasonOfFailure = error.toString();

			const errorEmbed = new EmbedBuilder()
				.setTitle('Purging Operation Failed')
				.setDescription('Purging Details')
				.addFields(
					{ name: 'Number of Messages', value: numberOfMessages, inline: true },
					{ name: 'Reason', value: reason, inline: true },
					{ name: 'Reason of Failure', value: reasonOfFailure },
				)
				.setFooter({
					text: 'Executed by ' + interaction.user.tag,
				})
				.setColor('Red')
				.setTimestamp();

			await interaction.reply({
				content: 'Purging Operation Failed',
				embeds: [errorEmbed],
				ephemeral: true,
			});
			return;
		}

		const purgeEmbed = new EmbedBuilder()
			.setTitle('Purging Operation Successful')
			.setDescription('Purging Details')
			.addFields(
				{ name: 'Number of Messages', value: numberOfMessages, inline: true },
				{ name: 'Reason', value: reason, inline: true },
			)
			.setFooter({
				text: 'Executed by ' + interaction.user.tag,
			})
			.setColor('Green')
			.setTimestamp();

		await interaction.reply({
			// content: 'Purging Operations End Message',
			embeds: [purgeEmbed],
			ephemeral: true,
		});
	},
};
