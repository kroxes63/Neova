const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yavaşmod')
        .setDescription('Belirli bir kanalda yavaş modu etkinleştirir.')
        .addIntegerOption(option =>
            option.setName('saniye')
            .setDescription('Yavaş mod süresini saniye olarak belirtin (0-21600)')
            .setRequired(true)),

    async execute(interaction) {
        const saniye = interaction.options.getInteger('saniye');
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için Kanal Yönetme Yetkisine sahip değilsiniz.', ephemeral: true });
        }

        if (saniye < 0 || saniye > 21600) {
            return interaction.reply({ content: 'Yavaş mod süresi 0 ile 21600 saniye arasında olmalıdır.', ephemeral: true });
        }

        try {
            await interaction.channel.setRateLimitPerUser(saniye);
            await interaction.reply({ content: `Bu kanalda yavaş mod ${saniye} saniye olarak ayarlandı.` });
        } catch (error) {
            await interaction.reply({ content: `Yavaş mod ayarlanırken bir hata oluştu: ${error.message}`, ephemeral: true });
        }
    }
};
