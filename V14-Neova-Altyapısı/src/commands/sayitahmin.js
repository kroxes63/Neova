const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const colors = {
    "Mavi": 0x0000FF,
    "Yeşil": 0x008000,
    "Kırmızı": 0xFF0000,
    "Turuncu": 0xFFA500,
    "Mor": 0x800080,
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sayitahmin")
        .setDescription("1 ile 10 arasında bir sayı tahmin et!"),

    async execute(interaction) {
        const randomNumber = Math.floor(Math.random() * 10) + 1; // 1 ile 10 arasında rastgele bir sayı
        const embed = new EmbedBuilder()
            .setTitle("Sayı Tahmin Oyunu")
            .setDescription("1 ile 10 arasında bir sayı tahmin edin!")
            .setColor(colors["Mavi"]); // Renk kodu kullanıldı

        await interaction.reply({ embeds: [embed] });

        const filter = m => m.author.id === interaction.user.id; // Kullanıcının mesajlarını filtrele
        const collector = interaction.channel.createMessageCollector({ filter, max: 5, time: 60000 }); // 5 tahmin ve 60 saniye süre

        collector.on("collect", async message => {
            const userGuess = parseInt(message.content);

            if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
                return message.reply("Lütfen 1 ile 10 arasında bir sayı tahmin edin!");
            }

            if (userGuess === randomNumber) {
                await message.reply(`🎉 Doğru tahmin ettiniz! Sayı **${randomNumber}** idi! Oyun bitti.`);
                collector.stop(); // Oyunu sonlandır
            } else if (userGuess < randomNumber) {
                await message.reply("Tahmininiz çok düşük! Tekrar deneyin.");
            } else {
                await message.reply("Tahmininiz çok yüksek! Tekrar deneyin.");
            }
        });

        collector.on("end", collected => {
            if (collected.size === 0) {
                interaction.followUp(`Süre doldu! Doğru sayı **${randomNumber}** idi.`);
            }
        });
    }
};