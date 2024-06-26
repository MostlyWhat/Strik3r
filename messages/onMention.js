/**
 * @file Default Bot Mention Command
 * @author MostlyWhat
 * @since 3.0.0
 */

const { PREFIX } = require("../config.js");
const prefix = PREFIX;

module.exports = {
	/**
	 * @description Executes when the bot is pinged.
	 * @author MostlyWhat
	 * @param {import('discord.js').Message} message The Message Object of the command.
	 */

	async execute(message) {
		return message.channel.send(
			`Hi ${message.author}! My prefix is \`${prefix}\`, get help by \`${prefix}help\``
		);
	},
};
