/**
 * @file Stall Command inspired by Megalord.EXE
 * @author MostlyWhat
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: 'stall',
	// Refer to typings.d.ts for available properties.

	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send({ content: 'Is Garbage!' });
	},
};
