const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const os = require('os');
const ms = require('ms'); // Eğer kullanmıyorsanız, `npm install ms` komutuyla yükleyebilirsiniz.

module.exports = {
    data: new SlashCommandBuilder()
        .setName('istatistik')
        .setDescription('Botun istatistiklerini gösterir.'),

    async execute(interaction) {
        const uptime = ms(interaction.client.uptime, { long: true });
        const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2); // Toplam RAM (MB)
        const usedMemory = (process.memoryUsage().rss / 1024 / 1024).toFixed(2); // Kullanılan RAM (MB)
        const cpuModel = os.cpus()[0].model; // CPU Modeli
        const botPing = Math.round(interaction.client.ws.ping); // Botun API gecikmesi
        const serverCount = interaction.client.guilds.cache.size; // Sunucu sayısı
        const userCount = interaction.client.users.cache.size; // Kullanıcı sayısı

        const embed = new EmbedBuilder()
            .setTitle('📊 Bot İstatistikleri')
            .addFields(
                { name: '<a:uptime_luffsky:1324208372479819826> Çalışma Süresi', value: uptime, inline: true },
                { name: '<a:iarethapis:1324208298647490595> API Gecikmesi', value: `${botPing}ms`, inline: true },
                { name: '<:server:1324208426594730127> Sunucu Sayısı', value: `${serverCount}`, inline: true },
                { name: '<:user:1323547122641141862> Kullanıcı Sayısı', value: `${userCount}`, inline: true },
                { name: '<:rams:1324076270417350777> Kullanılan RAM', value: `${usedMemory}MB`, inline: true },
                { name: '<:rams:1324076270417350777> Toplam RAM', value: `${totalMemory}MB`, inline: true },
                { name: '<:CPU:1324208207719305339> CPU', value: cpuModel, inline: false }
            )
            .setColor('Blue')
            .setFooter({ text: 'Bot istatistikleri' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
