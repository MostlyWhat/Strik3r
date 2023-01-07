// Import Node.js modules
const fs = require('node:fs');
const path = require('node:path');

// Import Variables from config.js
const { STRIK3R_TOKEN } = require('./config.js');

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');

// Setup Web Server to keep the bot alive
const http = require('http');
http.createServer(function (req, res) {
	res.write('I\'m alive');
	res.end();
}).listen(8080);

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a new collection for commands
client.commands = new Collection();

// Read all files in the commands directory
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(
			`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
		);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
	console.log(`[ Strik3r ] Logged in as ${c.user.tag}`);
	// eslint-disable-next-line prefer-const
	let activities = ['Inception', 'Avatar 2', 'Interstellar'], i = 0;
	setInterval(() => client.user.setPresence({ activities: [{ name: `${activities[i++ % activities.length]}`, type: ActivityType.Watching }], status: 'online' }), 10000);
});

// When the client is ready, run this code for each interaction
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({
			content: 'There was an error while executing this command!',
			ephemeral: true,
		});
	}
});

// Log in to Discord with your client's token
client.login(STRIK3R_TOKEN);