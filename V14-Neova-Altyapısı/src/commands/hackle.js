const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hackle')
        .setDescription('Simulates a hacking operation')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to hack')
                .setRequired(true)),
    async execute(interaction) {
        const mentionedUser = interaction.options.getUser('user');

        // Check if the author mentions themselves
        if (mentionedUser.id === interaction.user.id) {
            return interaction.reply(':x: : **<@' + interaction.user.id + '>, Seni Neden Heckleyim ?**');
        }

        // Check if a bot is mentioned
        if (mentionedUser.bot) {
            return interaction.reply(':x: : **<@' + interaction.user.id + '>, Aynen kanka Bak Kendimi Hackledim, Git Bak Bakim Burdamıyım.**');
        }

        // Send a "hacking" message
        await interaction.reply(`<@${mentionedUser.id}>, Hackleniyor...`);

        // Simulate the hacking process with delayed message edits
        setTimeout(async () => {
            await interaction.editReply(`<@${mentionedUser.id}>, Hackleniyor..`);
        }, 1000);

        setTimeout(async () => {
            await interaction.editReply(`<@${mentionedUser.id}>, Hackleniyor...`);
        }, 2000);

        setTimeout(async () => {
            // Generate random data for the "hacked" message
            const randomIP = `192.168.${Math.floor(Math.random() * (255 - 198 + 1)) + 198}.${Math.floor(Math.random() * (254 - 198 + 1)) + 198}`;
            const countries = ['Türkiye', 'Fransa', 'Amerika', 'Almanya', 'Kore', 'Çin', 'Japonya', 'Polonya', 'İsviçre', 'Avustralya', 'İspanya', 'Afrika'];
            const randomCountry = countries[Math.floor(Math.random() * countries.length)];
            const randomAge = Math.floor(Math.random() * (25 - 13 + 1)) + 13;
            const randomPassword = Math.random().toString(36).slice(-8);

            // Simulate "hacked" message
            await interaction.editReply(`
                <@${mentionedUser.id}>, Hacklendi!
                **Hackleme Başarılı!**

                > **Hackleyen:** <@${interaction.user.id}>
                > **Hacklenen:** <@${mentionedUser.id}>

                > **IP Adresi:** \`${randomIP}\`
                > **Ülke:** ${randomCountry}
                > **İsmi:** ${mentionedUser.username}
                > **Yaşı:** ${randomAge}
                > **E Mail'i:** ${mentionedUser.username.toLowerCase()}@gmail.com
                > **Şifresi:** ${randomPassword}
            `);
        }, 3000);
    },
};