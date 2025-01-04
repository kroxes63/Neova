const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const packageJson = require('../../package.json'); // Projenizin package.json dosyasını burada içe aktarabilirsiniz.

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botbilgi')
        .setDescription('Bot hakkında temel bilgileri gösterir.'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🤖 Bot Bilgisi')
            .setDescription('Bu bot hakkında detaylı bilgiler aşağıda verilmiştir.')
            .addFields(
                { name: 'Bot Adı', value: interaction.client.user.username, inline: true },
                { name: 'Bot ID', value: interaction.client.user.id, inline: true },
                { name: 'Geliştirici', value: 'Kroxes', inline: true },
                { name: 'Sürüm', value: `v${packageJson.version}`, inline: true },
                { name: 'Discord.js Sürümü', value: `v${packageJson.dependencies['discord.js']}`, inline: true },
                { name: 'Node.js Sürümü', value: process.version, inline: true },
                { name: 'Sunucu Sayısı', value: `${interaction.client.guilds.cache.size}`, inline: true },
                { name: 'Kullanıcı Sayısı', value: `${interaction.client.users.cache.size}`, inline: true }
            )
            .setColor('Purple')
            .setFooter({ text: 'Bot bilgileri', iconURL: interaction.client.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
