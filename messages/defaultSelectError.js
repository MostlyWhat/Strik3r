/**
 * @file Default Error Message On Error Select Menu Interaction
 * @author MostlyWhat
 * @since 3.0.0
 */

module.exports = {
	/**
	 * @description Executes when the select menu interaction could not be fetched.
	 * @author MostlyWhat
	 * @param {import('discord.js').SelectMenuInteraction} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: 'There was an issue while fetching this select menu option!',
			ephemeral: true,
		});
		return;
	},
};
