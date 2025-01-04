module.exports = {
    data: {
        name: 'joke',
        description: 'Rastgele bir şaka gönderir.',
    },
    async execute(interaction) {
        const jokes = [
            'Neden bilgisayar denize düşer? Çünkü tüm sabırlarını kaybettiler!',
            'Kediler neden bilgisayar kullanamaz? Çünkü fareyi hep yakalarlar!',
            'Matematik kitabı neden üzgündü? Çünkü çok problemi vardı!',
            'Bir telefon neden hiç şaka yapmaz? Çünkü bir noktada arıza çıkar!',
        ];

        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        await interaction.reply(randomJoke);
    },
};
