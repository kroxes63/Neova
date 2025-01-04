
const { SlashCommandBuilder } = require('discord.js');
const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Yardım menüsünü gösterir.'),

    async execute(interaction) {
        // Botun bulunduğu sunucuların sayısını al
        const serverCount = interaction.client.guilds.cache.size;

        // Ana Menü Embed
        const mainMenuEmbed = new EmbedBuilder()
            .setColor('#00b300') // Use a vibrant green color
            .setTitle('<a:loading:1323546563104084081> Neova - Yardım Menüsü')
            .setDescription('Neova, Discord sunucunuz için çok amaçlı bir bottur.\n Süper bir sunucu kurmanıza yardımcı olabilir!\n\n' +
                '** <a:loading:1323546563104084081> BOT Bilgisi**\n' +
                '<:circle:1321922109156491266>  Prefix: `/`\n' +
                '<:circle:1321922109156491266>   Node Version: `v20.13.1`\n' +
                '<:circle:1321922109156491266>   Yapımcı: [@Kroxes](https://discord.com/channels/1278642625007718471/1278642625007718471)\n\n' +
                '**<a:loading:1323546563104084081> Özellikler [1-6]**\n' +
                '<:points:1323547081549283398>   Ayarlamalı\n' +
                '<:user:1323547122641141862>  Kullanıcı\n' +
                '<:gear:1323547348449886249>   Moderasyon\n' +
                '<:fun:1323547258230145064>   Eğlence\n' + 
                '<:notification:1323547228148731964>   Giveaway\n'+
                '<:chart:1323547179306057790>   Statistics\n'
            )
            .setImage('https://cdn.discordapp.com/attachments/1316474014981689344/1323378738205036608/standard.gif?ex=67744bfe&is=6772fa7e&hm=44ee00123f7ffb5c01d4f4c381edb37948ea74bd6ba26c9b8ad201358c43eda4&')
            .setFooter({ text: 'Neova' }); // Add a footer with a logo if you have one.

        // Select Menu Oluşturma
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('yardım_menu')
            .setPlaceholder('Komut kategorilerini seçin')
            .addOptions([
                {
                    label: 'Ana Menü',
                    value: 'anamenü',
                    description: 'Ana menüye geri dön.',
                    emoji: '<:Home:1298712386416672879> ', // Ana Menüye emoji ekledik
                },
                {
                    label: 'Ayarlamalı',
                    value: 'ayarlamali',
                    description: 'Ayarlama komutlarına göz at.',
                    emoji: '<:points:1238429964613713960> ', // Ayarlamalı komutlara emoji ekledik
                },
                {
                    label: 'Bot ',
                    value: 'bot',
                    description: 'Bot ile ilgili komutları göster.',
                    emoji: '<:bot:1238429045243252818>   ', // Bot Komutları için emoji
                },
                {
                    label: 'Moderasyon ',
                    value: 'moderasyon',
                    description: 'Moderasyon komutlarını göster.',
                    emoji: '<:gear:1238429625055444993>  ', // Moderasyon Komutları için emoji
                },
                {
                    label: 'Kullanıcı ',
                    value: 'kulanıcı',
                    description: 'Kullanıcı komutlarını göster.',
                    emoji: '<:user:1238430144109215824>', // Kullanıcı Komutları için emoji
                },
                {
                    label: 'Eğlence ',
                    value: 'eglence',
                    description: 'Eğlence komutlarını göster.',
                    emoji: '<:fun:1238429593417945098>  ', // Eğlence Komutları için emoji
                },
                {
                    label: 'Giveaway ',
                    value: 'giveaway',
                    description: 'Giveaway komutlarını göster.',
                    emoji: '<:notification:1238429897920221294>', // Giveaway Komutları için emoji
                },
                {
                    label: 'Statistics',
                    value:'statistics',
                    description: 'Statistics komutlarını göster.',
                    emoji: '<:chart:1238429306938462238> ', // Statistics Komutları için emoji
                }
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        // Davet ve Destek Butonları
        const inviteButton = new ButtonBuilder()
            .setLabel('Beni Davet Et')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/oauth2/authorize?client_id=1304926694376869909&permissions=8&integration_type=0&scope=applications.commands+bot')
            .setEmoji('<:plus:1238429920573784074> ');

        const supportButton = new ButtonBuilder()
            .setLabel('Destek Sunucusu')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.gg/5Kv8NJty7m')
            .setEmoji('<:discord:1238429533808365628> ');

        const buttonRow = new ActionRowBuilder().addComponents(supportButton, inviteButton);

        // Ana menüyü gönder
        await interaction.reply({
            embeds: [mainMenuEmbed],
            components: [row, buttonRow],
        });

        // Menüye tepki verme işlemi
        const filter = (i) => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 0, // Zamanı 0 yaparak kolektörü sınırsız tut
        });

        collector.on('collect', async (i) => {
            const value = i.values[0];
            let embed = new EmbedBuilder();

            if (value === 'anamenü') {
                embed = mainMenuEmbed;
            } else if (value === 'ayarlamali') {
                embed
                    .setColor('#0099ff')
                    .setTitle('Ayarlamalı Komutlar')
                    .setDescription(' <:arrow_gx:1323553585933324311> `Yakında`: Yakında.');
            } else if (value === 'bot') {
                embed
                    .setColor('#0099ff')
                    .setTitle('Bot Komutları')
                    .setDescription('<:arrow_gx:1323553585933324311> `/ping`: Botun yanıt süresini gösterir.\n <:arrow_gx:1323553585933324311> `/yardım`: Yardım menüsünü görüntüler.');

                    
            } else if (value === 'moderasyon') {
                embed
                    .setColor('#0099ff')
                    .setTitle('Moderasyon Komutları')
                    .setDescription('<:arrow_gx:1323553585933324311> `/ban`: Bir üyeyi yasaklar.\n <:arrow_gx:1323553585933324311> `/unban`: Yasaklı bir üyeyi açar.\n <:arrow_gx:1323553585933324311> `/mute`: Bir üyeyi susturur.\n <:arrow_gx:1323553585933324311> `/unmute`: Susturulmuş bir üyeyi açar.\n <:arrow_gx:1323553585933324311> `/kick`: Bir üyeyi sunucudan atar.\n <:arrow_gx:1323553585933324311> `/sil`: Mesajları temizler.\n <:arrow_gx:1323553585933324311> `/uyar`: Bir üyeye uyarı verir.\n <:arrow_gx:1323553585933324311> `/uyari-sil`: Uyarıyı siler.\n <:arrow_gx:1323553585933324311> `/uyarilarim`: Kendi uyarılarınızı gösterir.\n <:arrow_gx:1323553585933324311> `/rolal`: Bir üyeden rol alır.\n <:arrow_gx:1323553585933324311> `/rolver`: Bir üyeye rol verir.');
            } else if (value === 'kulanıcı') {
                embed
                    .setColor('#0099ff')
                    .setTitle('Kullanıcı Komutları')
                    .setDescription(' <:arrow_gx:1323553585933324311> `/avatar`: Bir üyenin avatarını gösterir');
            } else if (value === 'eglence') {
                embed
                    .setColor('#0099ff')
                    .setTitle('Eğlence Komutları')
                    .setDescription('<:arrow_gx:1323553585933324311> `/hackle` : Birine şaka yapar.');
            } else if (value === 'giveaway') {
                embed
                    .setColor('#0099ff')
                    .setTitle('Giveaway Komutları')
                    .setDescription('<:arrow_gx:1323553585933324311> `Yakında`: Yakında.');
            }
            else if (value ==='statistics') {
                embed
                    .setColor('#0099ff')
                    .setTitle('Statistics Komutları')
                    .setDescription('<:arrow_gx:1323553585933324311> `/istatistik`: İstatistik bilgilerini gösterir.');
            }

            await i.update({ embeds: [embed], components: [row, buttonRow] });
        });

        collector.on('end', async () => {
            // Menü silinmeyecek, bu kısım boş bırakıldı.
        });
    },
};
