const Rest = require("@discordjs/rest");
const config = require('../../config.json');
const DiscordApi = require("discord-api-types/v10");
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`);

        // Komutları yükleme
        const rest = new Rest.REST({ version: "10" }).setToken(config.token);
        try {
            rest.put(DiscordApi.Routes.applicationCommands(client.user.id), {
                body: client.dccommands
            });
        } catch (error) {
            throw error;
        }

        // Belirli bir ses kanalına bağlanma
        const voiceChannelId = config.voiceChannelId; // Ses kanalı ID'si config dosyasından alınır
        const guildId = config.guildId; // Sunucu ID'si config dosyasından alınır
        const guild = client.guilds.cache.get(guildId);
        const voiceChannel = guild.channels.cache.get(voiceChannelId);

        // Ses kanalının geçerli olup olmadığını kontrol et
        if (voiceChannel && voiceChannel.type === DiscordApi.ChannelType.GuildVoice) {
            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
            });
            console.log(`Bot ${voiceChannel.name} adlı ses kanalına bağlandı.`);
        } else {
            console.log('Belirtilen ses kanalı bulunamadı veya ses kanalı değil.');
        }

        // Sunucu ve üye sayısını hesaplama
        const serverCount = client.guilds.cache.size;
        const membersCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

        // Oynuyor durumunu 5 saniyede bir değiştirme
        const statuses = [
            { name: 'Neova - 7/24 Hizmetinizdedir.', type: DiscordApi.ActivityType.Streaming, url: 'https://www.twitch.tv/kroxes235' },
            { name: `Neova - ${serverCount} Sunucu - ${membersCount} Üye`, type: DiscordApi.ActivityType.Streaming, url: 'https://www.twitch.tv/kroxes235' },
            { name: 'Neova - Xns Ekibi Tarafından Geliştiriliyor.', type: DiscordApi.ActivityType.Streaming, url: 'https://www.twitch.tv/kroxes235' },
            { name: 'Tüm komutlarım - /yardım', type: DiscordApi.ActivityType.Streaming, url: 'https://www.twitch.tv/kroxes235' }
        ];

        let currentStatus = 0;
        setInterval(() => {
            client.user.setActivity(statuses[currentStatus]);
            currentStatus = (currentStatus + 1) % statuses.length; // Status döngüsünü devam ettir
        }, 5000); // 5000 milisaniye = 5 saniye
    }
};
