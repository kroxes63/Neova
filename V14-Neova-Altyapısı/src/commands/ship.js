const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

// Command definition using SlashCommandBuilder
module.exports = {
    data: new SlashCommandBuilder()
        .setName('aşk-ölçer')
        .setDescription('Measure love between two users.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to measure love with')
                .setRequired(true)),
    async execute(interaction) {
        const user1 = interaction.user; // The user who invoked the command
        const user2 = interaction.options.getUser('user'); // The mentioned user

        // Generate a random love percentage
        const lovePercentage = Math.floor(Math.random() * 91) + 10; // Random percentage between 10 and 100

        // Construct the image URL
        const imageUrl = `https://agg-api.vercel.app/ship?avatar1=${user1.displayAvatarURL({ size: 2048 })}&avatar2=${user2.displayAvatarURL({ size: 2048 })}&number=${lovePercentage}`;

        // Create the embed message
        const embed = new EmbedBuilder()
            .setColor('#cfffe4')
            .setTitle('✯ Aşk Ölçüldü ✯')
            .setDescription(`<@${user1.id}> & <@${user2.id}>`)
            .setImage(imageUrl)
            .setFooter({ text: 'Aşk ölçümü', iconURL: user1.displayAvatarURL() });

        // Respond to the interaction
        await interaction.reply({ embeds: [embed] });
    },
};
