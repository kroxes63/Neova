const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fakemessage')
    .setDescription('Bir kullanıcı adına sahte mesaj gönderir.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) // Mesaj yönetme izni gerektirir
    .addUserOption(option => 
      option.setName('kullanici')
        .setDescription('Hangi kullanıcı adına sahte mesaj gönderilecek?')
        .setRequired(true))
    .addStringOption(option => 
      option.setName('mesaj')
        .setDescription('Gönderilecek sahte mesaj.')
        .setRequired(true)),
  
  async execute(interaction) {
    const user = interaction.options.getUser('kullanici');
    const messageContent = interaction.options.getString('mesaj');
    const channel = interaction.channel;

    if (!user || !messageContent) {
      return interaction.reply({ 
        content: 'Lütfen geçerli bir kullanıcı ve mesaj girin.', 
        ephemeral: true 
      });
    }

    try {
      // Webhook oluşturma
      const webhook = await channel.createWebhook({
        name: user.username,
        avatar: user.displayAvatarURL({ dynamic: true }),
      });

      // Mesaj gönderme
      await webhook.send(messageContent);

      // Webhook'u silme
      setTimeout(async () => {
        await webhook.delete();
      }, 5000); // 5 saniye sonra webhook silinir
      
      await interaction.reply({
        content: 'Sahte mesaj başarıyla gönderildi!',
        ephemeral: true,
      });
    } catch (error) {
      console.error('Hata:', error);
      await interaction.reply({ 
        content: 'Bir hata oluştu. Lütfen tekrar deneyin.', 
        ephemeral: true 
      });
    }
  },
};