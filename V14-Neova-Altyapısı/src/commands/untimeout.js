const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js'); // PermissionsBitField'ı içe aktarın

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription('Bir kullanıcının zaman aşımını kaldırır.')
        .addUserOption(option =>
            option.setName('üye')
                .setDescription('Zaman aşımı kaldırılacak kullanıcı')
                .setRequired(true)),

    async execute(interaction) {
        // Zaman aşımı kaldırma yetkisi kontrolü
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply('Bu komutu kullanma yetkiniz yok.');
        }

        const hedef = interaction.options.getUser('üye');
        const uye = interaction.guild.members.cache.get(hedef.id);

        if (!uye) {
            return interaction.reply('Kullanıcı bulunamadı.');
        }

        try {
            // Zaman aşımını kaldırma
            await uye.timeout(null); // null, zaman aşımını sıfırlamak için kullanılır
            await interaction.reply(`${hedef.tag} kullanıcısının zaman aşımı kaldırıldı.`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Zaman aşımı kaldırılırken bir hata oluştu.');
        }
    },
};
