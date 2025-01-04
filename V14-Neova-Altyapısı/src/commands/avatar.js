const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Kullanıcının avatarını gösterir.')
        .addUserOption(option => 
            option.setName('kullanıcı')
                .setDescription('Avatarını görmek istediğiniz kullanıcı')),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanıcı') || interaction.user;
        const embed = new EmbedBuilder()
            .setColor('#ff69b4')
            .setTitle(`${user.username}'ın Avatarı`)
            .setImage(user.displayAvatarURL({ dynamic: true }));

        await interaction.reply({ embeds: [embed] });
    },
};