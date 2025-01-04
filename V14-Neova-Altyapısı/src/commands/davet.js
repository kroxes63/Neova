const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('davet')
    .setDescription('Botun davet bağlantısını gönderir.'),
  async execute(interaction) {
    // Embed ve Butonlu davet mesajı burada
    const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Davet Et!')
      .setDescription('Beni sunucunuza eklemek için aşağıdaki düğmeyi kullanın!')
      .setFooter({ text: 'Beni ekliceksin demih?' });

    const button = new ButtonBuilder()
      .setLabel('Davet Linki')
      .setStyle(ButtonStyle.Link)
      .setURL(`https://discord.com/oauth2/authorize?client_id=1304926694376869909&permissions=8&scope=bot%20applications.commands`);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
