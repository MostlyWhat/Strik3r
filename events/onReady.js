/**
 * @file Ready Event File.
 * @author MostlyWhat
 * @since 1.0.0
 * @version 3.2.2
 */

const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {
		console.log(`[Strik3r] Logged in as ${client.user.tag}`);
		// eslint-disable-next-line prefer-const
		let activities = ['Minecraft', 'Halo Infinite', 'Astroneer', 'Among Us'],
			i = 0;
		setInterval(
			() =>
				client.user.setPresence({
					activities: [
						{
							name: `${activities[i++ % activities.length]}`,
							type: ActivityType.Playing,
						},
					],
					status: 'online',
				}),
			600000,
		);
	},
};
