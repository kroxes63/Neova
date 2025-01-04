const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js'); // PermissionsBitField'ı içe aktarın

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Bir kullanıcının sunucudaki yasağını kaldırır.')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('Yasağı kaldırılacak kullanıcının ID\'si.')
                .setRequired(true)),

    async execute(interaction) {
        // Yetki kontrolü: Kullanıcının "BAN_MEMBERS" yetkisi olup olmadığını kontrol et
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply('Bu komutu kullanmak için yasaklama yetkiniz yok.');
        }

        const userId = interaction.options.getString('userid');

        try {
            // Yasağı kaldır
            await interaction.guild.members.unban(userId);
            await interaction.reply(`Kullanıcı (${userId}) başarıyla yasak kaldırıldı.`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Bu kullanıcının yasağı kaldırılırken bir hata oluştu. Kullanıcı ID\'sini doğru girdiğinizden emin olun.');
        }
    },
};
