const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gelen-giden')
        .setDescription('Gelen ve giden kullanıcıların takibini yapar.')
        .addChannelOption(option =>
            option.setName('kanal')
                .setDescription('Gelen ve giden kullanıcı mesajlarının gönderileceği kanal.')
                .setRequired(true)),

    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal');

        // Kanalın metin kanalı olup olmadığını kontrol et
        if (!channel.isTextBased()) {
            return interaction.reply({ content: 'Lütfen geçerli bir metin kanalı seçin.', ephemeral: true });
        }

        // Botun kanalda mesaj gönderebilmesi için gerekli izni kontrol et
        if (!channel.permissionsFor(interaction.guild.members.me).has('SendMessages')) {
            return interaction.reply({ content: 'Botun bu kanalda mesaj gönderme izni yok.', ephemeral: true });
        }

        // Kanalı kaydediyoruz
        interaction.client.gelenGidenChannel = channel;

        await interaction.reply({ content: `${channel} kanalında gelen ve giden kullanıcı mesajları gönderilecek.`, ephemeral: true });
    },
};

// Gelen kullanıcı
module.exports.events = {
    guildMemberAdd(member) {
        const channel = member.client.gelenGidenChannel;

        // Kanalın varlığını kontrol et
        if (!channel) return;

        // Botun kanalda mesaj gönderme izni olup olmadığını tekrar kontrol et
        if (!channel.permissionsFor(member.guild.members.me).has('SendMessages')) {
            console.error('Botun bu kanalda mesaj gönderme izni yok.');
            return;
        }

        // Hoş geldin mesajı
        const embed = new EmbedBuilder()
            .setTitle('Yeni Bir Üye Katıldı!')
            .setDescription(`Hoş geldin ${member.user.tag}! Sunucumuza katıldın.`)
            .setColor('Green')
            .setTimestamp();

        channel.send({ embeds: [embed] });
    },

    // Giden kullanıcı
    guildMemberRemove(member) {
        const channel = member.client.gelenGidenChannel;

        // Kanalın varlığını kontrol et
        if (!channel) return;

        // Botun kanalda mesaj gönderme izni olup olmadığını tekrar kontrol et
        if (!channel.permissionsFor(member.guild.members.me).has('SendMessages')) {
            console.error('Botun bu kanalda mesaj gönderme izni yok.');
            return;
        }

        // Veda mesajı
        const embed = new EmbedBuilder()
            .setTitle('Bir Üye Ayrıldı!')
            .setDescription(`${member.user.tag} sunucudan ayrıldı. Üzüldük!`)
            .setColor('Red')
            .setTimestamp();

        channel.send({ embeds: [embed] });
    },
};
