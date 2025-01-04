const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

// Mesaj, ses ve davet istatistiklerini saklamak için geçici yapılar
const messageStats = {};
const voiceStats = {};
const inviteStats = {}; // Her davetin kaç kez kullanıldığını takip eden yapı

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Sunucuda en fazla mesaj gönderen, seste duran ve davet yapan üyeleri gösterir.'),

    async execute(interaction) {
        const guild = interaction.guild;

        // Davet istatistiklerini güncellemesi (Sunucunun tüm davetlerini kontrol et)
        const invites = await guild.invites.fetch();
        invites.forEach(invite => {
            if (!inviteStats[guild.id]) inviteStats[guild.id] = {};
            // Davet yalnızca ilk kez kullanıldığında sayılacak
            if (!inviteStats[guild.id][invite.inviter?.id]) {
                inviteStats[guild.id][invite.inviter?.id] = 0;
            }
            inviteStats[guild.id][invite.inviter?.id] += (invite.uses || 0);
        });

        // En fazla mesaj gönderen
        const topMessager = Object.entries(messageStats[guild.id] || {})
            .sort(([, a], [, b]) => b - a)
            .map(([id, count]) => ({ id, count }))[0];

        // En uzun süre seste kalan
        const topVoiceUser = Object.entries(voiceStats[guild.id] || {})
            .sort(([, a], [, b]) => b - a)
            .map(([id, duration]) => ({ id, duration }))[0];

        // En fazla davet yapan
        const topInviter = Object.entries(inviteStats[guild.id] || {})
            .sort(([, a], [, b]) => b - a)
            .map(([id, invites]) => ({ id, invites }))[0];

        const embed = new EmbedBuilder()
            .setTitle('📊 Sunucu İstatistikleri')
            .addFields(
                {
                    name: 'En Fazla Mesaj Gönderen',
                    value: topMessager
                        ? `<@${topMessager.id}> - ${topMessager.count} mesaj`
                        : 'Veri yok',
                    inline: true,
                },
                {
                    name: 'En Uzun Süre Seste Kalan',
                    value: topVoiceUser
                        ? `<@${topVoiceUser.id}> - ${Math.round(topVoiceUser.duration / 60)} dakika`
                        : 'Veri yok',
                    inline: true,
                },
                {
                    name: 'En Fazla Davet Yapan',
                    value: topInviter
                        ? `<@${topInviter.id}> - ${topInviter.invites} davet`
                        : 'Veri yok',
                    inline: true,
                }
            )
            .setColor('Green')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};

// Mesaj ve ses verilerini toplamak için eventler
module.exports.events = {
    messageCreate(message) {
        if (message.guild) {
            const guildId = message.guild.id;
            if (!messageStats[guildId]) messageStats[guildId] = {};
            messageStats[guildId][message.author.id] =
                (messageStats[guildId][message.author.id] || 0) + 1;
        }
    },

    voiceStateUpdate(oldState, newState) {
        const guildId = newState.guild.id;

        if (!voiceStats[guildId]) voiceStats[guildId] = {};

        // Eğer kullanıcı bir ses kanalına bağlanıyorsa
        if (newState.channelId && !oldState.channelId) {
            voiceStats[guildId][newState.id] = {
                joinedAt: Date.now(),
                totalDuration: voiceStats[guildId][newState.id]?.totalDuration || 0,
            };
        }

        // Eğer kullanıcı bir ses kanalından çıkıyorsa
        if (!newState.channelId && oldState.channelId) {
            const session = voiceStats[guildId][oldState.id];
            if (session && session.joinedAt) {
                const duration = Date.now() - session.joinedAt;
                voiceStats[guildId][oldState.id].totalDuration += duration;
                delete voiceStats[guildId][oldState.id].joinedAt;
            }
        }
    },

    inviteCreate(invite) {
        const guildId = invite.guild.id;
        if (!inviteStats[guildId]) inviteStats[guildId] = {};

        // Yeni davetlerin kullanılmasını takip et
        if (!inviteStats[guildId][invite.inviter.id]) {
            inviteStats[guildId][invite.inviter.id] = 0; // İlk kez davet yapan için başlatma
        }

        // Davet sayısını güncelle
        inviteStats[guildId][invite.inviter.id] += (invite.uses || 0);
    },
};
