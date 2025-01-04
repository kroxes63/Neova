const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resimara')
        .setDescription('Resim araması yapın.')
        .addStringOption(option =>
            option.setName('arama')
                .setDescription('Aranacak kelimeyi girin')
                .setRequired(true)),

    async execute(interaction) {
        const searchQuery = interaction.options.getString('arama');
        const userId = interaction.user.id;
        
        try {
            // API'den veri al
            const response = await axios.get(`https://api.oxzof.com/image-search?q=${encodeURIComponent(searchQuery)}`);
            const results = response.data;

            if (results.length === 0) {
                return interaction.reply({ content: 'Herhangi bir sonuç bulunamadı, lütfen başka bir arama yapın.', ephemeral: true });
            }

            let currentIndex = 0;

            const generateEmbed = (index) => {
                const embed = new EmbedBuilder()
                    .setColor('#638388')
                    .setTitle('🔎 Resim Arama Sonuçları')
                    .setDescription(`Arama terimi: **${searchQuery}**`)
                    .setImage(results[index])
                    .setFooter({ text: `Sonuç ${index + 1} / ${results.length}` });

                return embed;
            };

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('back')
                        .setLabel('← Önceki')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(currentIndex === 0),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('Sonraki →')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(currentIndex === results.length - 1),
                    new ButtonBuilder()
                        .setCustomId('close')
                        .setLabel('Kapat')
                        .setStyle(ButtonStyle.Danger)
                );

            const message = await interaction.reply({
                embeds: [generateEmbed(currentIndex)],
                components: [row],
                fetchReply: true
            });

            const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

            collector.on('collect', async (i) => {
                if (i.user.id !== userId) {
                    return i.reply({ content: 'Bu düğmeyi kullanamazsınız!', ephemeral: true });
                }

                if (i.customId === 'back') {
                    currentIndex = Math.max(currentIndex - 1, 0);
                } else if (i.customId === 'next') {
                    currentIndex = Math.min(currentIndex + 1, results.length - 1);
                } else if (i.customId === 'close') {
                    collector.stop();
                    return i.message.delete();
                }

                await i.update({
                    embeds: [generateEmbed(currentIndex)],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('back')
                                    .setLabel('← Önceki')
                                    .setStyle(ButtonStyle.Primary)
                                    .setDisabled(currentIndex === 0),
                                new ButtonBuilder()
                                    .setCustomId('next')
                                    .setLabel('Sonraki →')
                                    .setStyle(ButtonStyle.Primary)
                                    .setDisabled(currentIndex === results.length - 1),
                                new ButtonBuilder()
                                    .setCustomId('close')
                                    .setLabel('Kapat')
                                    .setStyle(ButtonStyle.Danger)
                            )
                    ]
                });
            });

            collector.on('end', collected => {
                interaction.editReply({ components: [] });
            });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.', ephemeral: true });
        }
    }
};