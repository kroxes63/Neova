const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rolver')
    .setDescription('Kullanıcıya rol verir.')
    .addUserOption(option => 
      option.setName('kullanıcı')
        .setDescription('Rol verilecek kullanıcıyı seçin')
        .setRequired(true))
    .addRoleOption(option => 
      option.setName('rol')
        .setDescription('Verilecek rolü seçin')
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
    await member.roles.add(role);

    
    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('Rol Verildi')
      .setDescription(`${user.tag} kullanıcısına başarıyla ${role.name} rolü verildi!`)
      .setTimestamp();

    
    await interaction.reply({ embeds: [embed] });
  },
};