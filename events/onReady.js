/**
 * @file Ready Event File.
 * @author MostlyWhat
 * @since 1.0.0
 * @version 3.2.2
 */

const { Events, ActivityType } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {
		console.log(`[Strik3r] Logged in as ${client.user.tag}`);
		client.user.setPresence({
			activities: [
				{
					name: 'Destiny 2',
					type: ActivityType.Competing,
				},
			],
			status: 'online',
		});
	},
};
