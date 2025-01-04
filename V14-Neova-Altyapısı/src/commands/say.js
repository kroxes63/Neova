const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Sunucu istatistiklerini gösterir.'),
  async execute(interaction) {
    const { guild } = interaction;

    if (!guild) {
      return interaction.reply({ content: 'Bu komut sunucularda kullanılabilir.', ephemeral: true });
    }

    const totalMembers = guild.memberCount;
    const activeMembers = guild.members.cache.filter(
      (member) => member.presence && member.presence.status !== 'offline'
    ).size;
    const voiceMembers = guild.members.cache.filter((member) => member.voice.channel).size;

    const embed = new EmbedBuilder()
      .setDescription(`
> **Sunucumuzda toplam ${totalMembers} kişi bulunmakta.**
> **Sunucumuzda ${activeMembers} aktif kişi bulunmakta.**
> **Ses kanallarında ${voiceMembers} adet kullanıcı bulunmaktadır.**
`)
      .setColor('2F3136')
      .setThumbnail(guild.iconURL())
      .setFooter({ text: 'Neova' });

    await interaction.reply({ embeds: [embed] });
  },
};