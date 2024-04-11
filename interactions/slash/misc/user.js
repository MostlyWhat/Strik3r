const { SlashCommandBuilder } = require('discord.js');

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Shows details about the user')
        .addUserOption(option => option.setName('user').setDescription('The user to get details for')),

    async execute(interaction) {
        let user = interaction.options.getUser('user');
        if (!user) {
            user = interaction.user;
        }

        const username = user.username;
        const avatarURL = user.displayAvatarURL();

        const joinDate = user.createdAt;
        const serverJoinDate = interaction.guild.members.cache.get(user.id).joinedAt;

        await interaction.reply(`Username: ${username}\nAvatar: ${avatarURL}\nJoin Date: ${joinDate}\nServer Join Date: ${serverJoinDate}`);
    },
};