const { REST, Routes } = require('discord.js');
const fs = require('node:fs');

// Import Variables from config.js
const { STRIK3R_ID, STRIK3R_TOKEN, SERVER_ID } = require('./config.js');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(STRIK3R_TOKEN);

// put the above code into a function and export it
module.exports = {
	deploy: async () => {
		try {
			console.log(
				`[ Strik3r ] Started refreshing ${commands.length} (/) commands.`,
			);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(STRIK3R_ID, SERVER_ID),
				{ body: commands },
			);

			console.log(
				`[ Strik3r ] Successfully registered ${data.length} (/) commands.`,
			);
		}
		catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	},
};
