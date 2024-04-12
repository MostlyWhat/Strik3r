/**
 * @file Greeting Triggers.
 * @author MostlyWhat
 * @since 2.0.0
 * @version 3.2.2
 */

// For now, the only available property is name array. Not making the name array will result in an error.

/**
 * @type {import('../../typings').TriggerCommand}
 */
module.exports = {
	name: [
		"hello",
		"welcome",
		"hallo",
		"helo",
		"hi",
		"hey",
		"greetings",
		"howdy",
		"hewo",
		"Hello",
		"Welcome",
		"Hallo",
		"Helo",
		"Hi",
		"Hey",
		"Greetings",
		"Howdy",
		"Hewo",
	],

	execute(message, args) {
		// Put all your trigger code over here. This code will be executed when any of the element in the "name" array is found in the message content.

		const greeting_response = [
			"Hello",
			"Hi",
			"Welcome",
			"Hallo",
			"Helo",
			"Hey",
			"Greetings",
			"Howdy",
			"Hewo",
		];

		message.channel.send({
			content:
				greeting_response[
					Math.floor(Math.random() * greeting_response.length)
				] +
				" " +
				message.author.username +
				"!",
		});
	},
};
