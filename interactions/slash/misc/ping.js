const { SlashCommandBuilder } = require('discord.js');

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s latency'),

    async execute(interaction) {
        const ping = Date.now() - interaction.createdTimestamp;
        await interaction.reply(`Pong! Latency: ${ping}ms`);
    },
};
