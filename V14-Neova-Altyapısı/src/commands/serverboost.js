const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverboost')
        .setDescription('Sunucu boost sayısını gösterir.'),
    async execute(interaction) {
        await interaction.reply(`Sunucu boost sayısı: ${interaction.guild.premiumSubscriptionCount}`);
    },
};
