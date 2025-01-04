const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Botun gecikme süresini gösterir.'),

    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Gecikme ölçülüyor...', fetchReply: true });

        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        const embed = new EmbedBuilder()
            .setTitle('<a:ping:1324076736098598925> Ping Bilgisi')
            .addFields(
                { name: '<a:ping:1324076736098598925> Mesaj Gecikmesi', value: `${latency}ms`, inline: true },
                { name: '<a:ping:1324076736098598925> API Gecikmesi', value: `${apiLatency}ms`, inline: true }
            )
            .setColor('Green')
            .setFooter({ text: 'Neova' })
            .setTimestamp();

        await interaction.editReply({ content: null, embeds: [embed] });
    },
};
