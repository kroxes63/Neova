const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Bir kullanıcının bannerını gösterir.')
        .addUserOption(option => 
            option.setName('kullanıcı')
                .setDescription('Bannerını görmek istediğiniz kullanıcı')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanıcı') || interaction.user;

        // Kullanıcıyı fetch ile detaylı şekilde alıyoruz
        const fetchedUser = await interaction.client.users.fetch(user.id, { force: true });

        // Banner URL'sini al
        const bannerURL = fetchedUser.bannerURL({ size: 1024, dynamic: true });

        if (!bannerURL) {
            return interaction.reply({ content: 'Bu kullanıcının bir bannerı yok!', ephemeral: true });
        }

        // Embed oluştur
        const embed = new EmbedBuilder()
            .setTitle(`${fetchedUser.username} kullanıcısının bannerı:`)
            .setImage(bannerURL)
            .setColor('Random');

        await interaction.reply({ embeds: [embed] });
    },
};
