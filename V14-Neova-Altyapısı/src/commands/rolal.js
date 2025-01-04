const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rolal')
    .setDescription('Kullanıcıdan rol alır.')
    .addUserOption(option => 
      option.setName('kullanıcı')
        .setDescription('Rol alınacak kullanıcıyı seçin')
        .setRequired(true))
    .addRoleOption(option => 
      option.setName('rol')
        .setDescription('Alınacak rolü seçin')
        .setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('kullanıcı');
    const role = interaction.options.getRole('rol');
    
    

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return interaction.reply({
        content: 'Bu komutu kullanmak için yeterli izniniz yok!',
        ephemeral: true
      });
    }

    
    const member = await interaction.guild.members.fetch(user.id);
    await member.roles.remove(role);

   
    const embed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('Rol Alındı')
      .setDescription(`${user.tag} kullanıcısından başarıyla ${role.name} rolü alındı!`)
      .setTimestamp();

    
    await interaction.reply({ embeds: [embed] });
  },
};