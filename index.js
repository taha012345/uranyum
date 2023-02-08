// Discord
const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, AuditLogEvent } = require("discord.js");
// İNTENTS
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember] });
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
// Database
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")

// Lourity - discord.gg/uranyum
global.client = client;
client.commands = (global.commands = []);
const { readdirSync } = require("fs")
const config = require("./config.json");
const { TOKEN } = require("./config.json");
const { setTimeout } = require("timers");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: false,
        type: 1
    });

    console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)

// Komutlar -----------------------------------------------------------------------------------|
// Bir Hata Oluştu
process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
})

process.on("unhandledRejection", async (error) => {
    return console.log("Bir hata oluştu! " + error)
})

const InvitesTracker = require('@androz2091/discord-invites-tracker');
const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true
});

tracker.on("guildMemberAdd", async (member, type, invite) => {

    const kanal = config.INVITE_CHANNEL
    const channel = client.channels.cache.get(kanal)

    if (!channel) return;

    let davet = louritydb.get(`davet_${invite.inviter.id}`)
    let davetEdildi = louritydb2.get(`davetEdildi_${member.id}`)

    if (davetEdildi) {
        return invite.inviter.send({ content: `${member} adlı kullanıcı **Uranyum'a** senin sayende giriş yaptı. Fakat bu kişi **zaten davet edilmiş.(önceden katılmış)**` }).catch((e) => { })
    }
// Lourity - discord.gg/uranyum

    if (type === 'normal') {
        louritydb.add(`kredi_${invite.inviter.id}`, +20000)
        louritydb.add(`davet_${invite.inviter.id}`, +1)
        louritydb2.set(`davetEdildi_${member.id}`, member.id)

        channel.send({ content: `<a:7o1king:1042890789753204736>  ${member} **Uranyum'a** ${invite.inviter.username} **Senin Sayende Giriş Yaptı 20.000 Ucr Kazandın** <a:7o1king:1042890789753204736>  (${davet + 1 || "0"})` }).catch((e) => { })
        return invite.inviter.send({ content: `<a:7o1king:1042890789753204736>  ${member} isimli kullanıcı **Uranyum'a** senin sayende giriş yaptı. Hesabınıza başarıyla **20.000 Ucr** aktarıldı!` }).catch((e) => { })
    }

    else if (type === 'vanity') {
        louritydb2.set(`davetEdildi_${member.id}`, member.id)

        return channel.send({ content: `<a:7o1king:1042890789753204736>  ${member} adlı kullanıcı Uranyuma Özel Url İle Giriş Yaptı ` }).catch((e) => { })
    }
// Lourity - discord.gg/uranyum

    else if (type === 'unknown') {
        louritydb2.set(`davetEdildi_${member.id}`, member.id)

        return channel.send({ content: `${member} adlı kullanıcının Uranyuma Nasıl Giriş Yaptıgı Bilinmiyor.?` }).catch((e) => { })
    }
})


client.on('messageCreate', async (message) => {
// Lourity - discord.gg/uranyum
    const kanal = config.CHAT_CHANNEL
    const channel = client.channels.cache.get(kanal)

    if (!channel) return;

    if (message.author.bot) return;

    louritydb.add(`mesaj_${message.author.id}`, +1)

    let mesaj = louritydb.get(`mesaj_${message.author.id}`, +1)

    if (mesaj === 2500) {

        const krediler = ["1512", "2520", "3547", "4570", "5534", "6559", "2514", "1504", "564"]
        const random = krediler[
            Math.floor(Math.random() * krediler.length)
        ]

        louritydb.add(`kredi_${message.author.id}`, random)
        message.author.send({ content: `:tada: Dostum **Uranyum** adlı sunucumuzda 2500 adet mesaj yazdın! Bunun için sana **${random} ucr** verdim :3` }).catch((e) => { })
        louritydb.delete(`mesaj_${message.author.id}`)
    }

})

client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;

    const row = new ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setEmoji("🟩")
                .setLabel("Onayla")
                .setStyle(Discord.ButtonStyle.Success)
                .setCustomId("onayla")
        )
        .addComponents(
            new Discord.ButtonBuilder()
                .setEmoji("🟥")
                .setLabel("Reddet")
                .setStyle(Discord.ButtonStyle.Danger)
                .setCustomId("reddet")
        )
    // Lourity - discord.gg/uranyum
    if (interaction.customId === "spotify" + interaction.user.id) {

        const kanal = config.SHOPLOG_CHANNEL
        const channel = client.channels.cache.get(kanal)

        if (!channel) return;

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bunu Yapmaya Çalışırken Bir Sorun Oluştu.")

        const kredi = louritydb.get(`kredi_${interaction.user.id}`)

        const basarisiz = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Dostum yeterli Miktarda Ucr (${kredi - 500000 || "500000"} $) Sahip Değilsin.\n💰 Ucr Miktarı: **${kredi || 0} Ucr**`)
        // Lourity - discord.gg/uranyum

        if (kredi < 5000 || !kredi) return interaction.reply({ embeds: [basarisiz], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

        const spotify = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Tebrikler! Spotify Premium Satın Aldınız.")
            .setDescription(`<:spotify:1051512843075321986>   ${interaction.user.username} Dostum Bir Spotify Premium Aldın! Özel Mesajlarını Kontrol Et.`)
            .setImage("https://media1.tenor.com/images/e1fd4ff42613e8053b0f840f39a17df6/tenor.gif")
            .setFooter({ text: "Yetkililerimiz En Yakın Sürede Sana Hediyeni Verecek Dostum!", iconURL: interaction.user.avatarURL({ dynamic: true }) })


        const spotifyFatura = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Faturanız:")
            .setURL("https://discord.gg/uranyum")
            .setDescription(`Alınan Ürün: <:spotify:1051512843075321986>  Spotify Premium\nAlıcı: ${interaction.user.tag}\nSatıcı: Uranyum Discord\nÖdenen Ucr: 500000\n\n**Not:** Almış Olduğun Ürün **48 Saat** İçerisinde Yetkililer Tarafından **Özel Mesaj** Olarak Atılacaktır.`)

        interaction.user.send({ embeds: [spotifyFatura] }).catch((e) => { })

        // Lourity - discord.gg/
        louritydb2.push(`hediyeler_${interaction.user.id}`, "spotify")
        louritydb.add(`kredi_${interaction.user.id}`, -500000)
        interaction.reply({ embeds: [spotify] }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const sell = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Yeni Bir Satın Alım!")
            .setDescription(`<a:Spotify:1070737162582114304>  ${interaction.user.tag} Adlı Üye **Spotify Premium** Satın Aldı!`)
            .addFields(
                { name: "Kullanıcı Adı:", value: `${interaction.user.tag}`, inline: true },
                { name: "Kullanıcı Etiket:", value: `<@${interaction.user.id}>`, inline: true }
            )
            .setThumbnail(interaction.user.avatarURL({ dynamic: true }))

        return channel.send({ content: `<@984365876155396138`, embeds: [sell], components: [row] }).catch((e) => { })
    }
    // Lourity - discord.gg/uranyum
    if (interaction.customId === "owocash" + interaction.user.id) {

        const kanal = config.SHOPLOG_CHANNEL
        const channel = client.channels.cache.get(kanal)

        if (!channel) return;

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bunu Yapmaya Çalışırken Bir Sorun Oluştu.")

        const kredi = louritydb.get(`kredi_${interaction.user.id}`)

        const basarisiz = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Dostum yeterli Miktarda Ucr (${kredi - 1000000 || "1000000"} $) Sahip Değilsin.\n💰 Ucr Miktarı: **${kredi || 0} Ucr**`)
        // Lourity - discord.gg/uranyum

        if (kredi < 5000 || !kredi) return interaction.reply({ embeds: [basarisiz], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

        const owocash = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Tebrikler! 1 M OwO Cash Satın Aldınız.")
            .setDescription(`<a:prime_owo:1071819602146889829>  ${interaction.user.username} Dostum 1 M 8w8 Aldın! Özel Mesajlarını Kontrol Et.`)
            .setImage("https://media.tenor.com/FXdTK3eUXPIAAAAC/owo-furry.gif%22")
            .setFooter({ text: "Yetkililerimiz En Yakın Sürede Sana Hediyeni Verecek Dostum!", iconURL: interaction.user.avatarURL({ dynamic: true }) })


        const owocashFatura = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Faturanız:")
            .setURL("https://discord.gg/uranyum")
            .setDescription(`Alınan Ürün: <a:prime_owo:1071819602146889829>  1 M OwO \nAlıcı: ${interaction.user.tag}\nSatıcı: Uranyum Discord\nÖdenen Ucr: 1.000.000\n\n**Not:** Almış Olduğun Ürün **48 Saat** İçerisinde Yetkililer Tarafından **Özel Mesaj** Olarak Atılacaktır.`)

        interaction.user.send({ embeds: [owocashFatura] }).catch((e) => { })

        // Lourity - discord.gg/uranyum
        louritydb2.push(`hediyeler_${interaction.user.id}`, "owocash")
        louritydb.add(`kredi_${interaction.
            user.id}`, -1000000)
        interaction.reply({ embeds: [owocash] }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const sell = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Yeni Bir Satın Alım!")
            .setDescription(`<a:prime_owo:1055098442923389029> ${interaction.user.tag} Adlı Üye **1 Milyon 8W8** Satın Aldı!`)
            .addFields(
                { name: "Kullanıcı Adı:", value: `${interaction.user.tag}`, inline: true },
                { name: "Kullanıcı Etiket:", value: `<@${interaction.user.id}>`, inline: true }
            )
            .setThumbnail(interaction.user.avatarURL({ dynamic: true }))

        return channel.send({ content: `<@984365876155396138`, embeds: [sell], components: [row] }).catch((e) => { })
    }
        // Lourity - discord.gg/uranyum
        if (interaction.customId === "instagram" + interaction.user.id) {

            const kanal = config.SHOPLOG_CHANNEL
            const channel = client.channels.cache.get(kanal)
    
            if (!channel) return;
    
            const hata = new EmbedBuilder()
                .setColor("Red")
                .setDescription("Bunu Yapmaya Çalışırken Bir Sorun Oluştu.")
    
            const kredi = louritydb.get(`kredi_${interaction.user.id}`)
    
            const basarisiz = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`Dostum yeterli Miktarda Ucr (${kredi - 1000000 || "1000000"} $) Sahip Değilsin.\n💰 Ucr Miktarı: **${kredi || 0} Ucr**`)
            // Lourity - discord.gg/uranyum
    
            if (kredi < 5000 || !kredi) return interaction.reply({ embeds: [basarisiz], ephemeral: true }).catch((e) => {
                return interaction.reply({ embeds: [hata], ephemeral: true })
            })
    
            const instagram = new EmbedBuilder()
                .setColor("Green")
                .setTitle("Tebrikler! İnstagram 1 K Lık (Hangisini Seçersen & Begeni+Takipçi+İzlenme+Yorum) Paketini Satın Aldınız.")
                .setDescription(`<:_instagramming_:1071905242305802301>  ${interaction.user.username} Dostum instagram 1K Hizmet Paketi Aldın! Özel Mesajlarını Kontrol Et.`)
                .setImage("https://media.tenor.com/VT6FD07iaBgAAAAC/instagram-mycrxn.gif")
                .setFooter({ text: "Yetkililerimiz En Yakın Sürede Sana Hediyeni Verecek Dostum!", iconURL: interaction.user.avatarURL({ dynamic: true }) })
    
    
            const instagramFatura = new EmbedBuilder()
                .setColor("Green")
                .setTitle("Faturanız:")
                .setURL("https://discord.gg/uranyum")
                .setDescription(`Alınan Ürün: <:_instagramming_:1071905242305802301>  1 K İnstagram Hizmet \nAlıcı: ${interaction.user.tag}\nSatıcı: Uranyum Discord\nÖdenen Ucr: 1.000.000\n\n**Not:** Almış Olduğun Ürün **48 Saat** İçerisinde Yetkililer Tarafından **Özel Mesaj** Olarak Atılacaktır.`)
    
            interaction.user.send({ embeds: [instagramFatura] }).catch((e) => { })
    
            // Lourity - discord.gg/uranyum
            louritydb2.push(`hediyeler_${interaction.user.id}`, "instagram")
            louritydb.add(`kredi_${interaction.user.id}`, -1000000)
            interaction.reply({ embeds: [instagram] }).catch((e) => {
                return interaction.reply({ embeds: [hata], ephemeral: true })
            })
    
    
            const sell = new EmbedBuilder()
                .setColor("Yellow")
                .setTitle("Yeni Bir Satın Alım!")
                .setDescription(`<:_instagramming_:1071905242305802301>  ${interaction.user.tag} Adlı Üye **İnstagram 1 K Lık Paket ** Satın Aldı!`)
                .addFields(
                    { name: "Kullanıcı Adı:", value: `${interaction.user.tag}`, inline: true },
                    { name: "Kullanıcı Etiket:", value: `<@${interaction.user.id}>`, inline: true }
                )
                .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
    
            return channel.send({ content: `<@984365876155396138`, embeds: [sell], components: [row] }).catch((e) => { })
        }

    // Lourity - discord.gg/uranyum
    if (interaction.customId === "tiktok" + interaction.user.id) {

        const kanal = config.SHOPLOG_CHANNEL
        const channel = client.channels.cache.get(kanal)

        if (!channel) return;

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bunu Yapmaya Çalışırken Bir Sorun Oluştu.")

        const kredi = louritydb.get(`kredi_${interaction.user.id}`)

        const basarisiz = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Dostum yeterli Miktarda Ucr (${kredi - 1000000 || "1000000"} $) Sahip Değilsin.\n💰 Ucr Miktarı: **${kredi || 0} Ucr**`)
        // Lourity - discord.gg/uranyum

        if (kredi < 5000 || !kredi) return interaction.reply({ embeds: [basarisiz], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

        const tiktok = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Tebrikler! Tiktok 1 K Lık (Hangisini Seçersen & Begeni+Takipçi+İzlenme+Yorum) Paketini Satın Aldınız.")
            .setDescription(`<a:tiktok87:1072549445444575242> ${interaction.user.username} Dostum Tiktok 1K Hizmet Paketi Aldın! Özel Mesajlarını Kontrol Et.`)
            .setImage("https://media.tenor.com/PNjsCi7p9AkAAAAd/key-tik-tok.gif")
            .setFooter({ text: "Yetkililerimiz En Yakın Sürede Sana Hediyeni Verecek Dostum!", iconURL: interaction.user.avatarURL({ dynamic: true }) })


        const tiktokFatura = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Faturanız:")
            .setURL("https://discord.gg/uranyum")
            .setDescription(`Alınan Ürün: <a:tiktok87:1072549445444575242> 1 K Tiktok Hizmet \nAlıcı: ${interaction.user.tag}\nSatıcı: Uranyum Discord\nÖdenen Ucr: 1.000.000\n\n**Not:** Almış Olduğun Ürün **48 Saat** İçerisinde Yetkililer Tarafından **Özel Mesaj** Olarak Atılacaktır.`)

        interaction.user.send({ embeds: [tiktokFatura] }).catch((e) => { })

        // Lourity - discord.gg/uranyum
        louritydb2.push(`hediyeler_${interaction.user.id}`, "tiktok")
        louritydb.add(`kredi_${interaction.user.id}`, -1000000)
        interaction.reply({ embeds: [tiktok] }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

        const sell = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Yeni Bir Satın Alım!")
            .setDescription(`<a:tiktok87:1072549445444575242>   ${interaction.user.tag} Adlı Üye **Tiktok 1 K Lık Paket ** Satın Aldı!`)
            .addFields(
                { name: "Kullanıcı Adı:", value: `${interaction.user.tag}`, inline: true },
                { name: "Kullanıcı Etiket:", value: `<@${interaction.user.id}>`, inline: true }
            )
            .setThumbnail(interaction.user.avatarURL({ dynamic: true }))

        return channel.send({ content: `<@984365876155396138`, embeds: [sell], components: [row] }).catch((e) => { })
    }

    // Lourity - discord.gg/uranyum
    if (interaction.customId === "nitro" + interaction.user.id) {

        const kanal = config.SHOPLOG_CHANNEL
        const channel = client.channels.cache.get(kanal)

        if (!channel) return;

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bunu Yapmaya Çalışırken Bir Sorun Oluştu.")

        const kredi = louritydb.get(`kredi_${interaction.user.id}`)

        const basarisiz = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Dostum yeterli Miktarda Ucr (${kredi - 2500000 || "2500000"} $) Sahip Değilsin.\n💰 Ucr Miktarı: **${kredi || 0} Ucr**`)
        // Lourity - discord.gg/uranyum

        if (kredi < 5000 || !kredi) return interaction.reply({ embeds: [basarisiz], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

        const nitro = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Tebrikler! NitroBoost(Hiç Nitro Alınmamış Hesaplar İçin Promosyon Kodu)3 Aylık Satın Aldınız.")
            .setDescription(`<a:NitroBoost:1072579131134459944>  ${interaction.user.username} Dostum 3 Aylık Nitro Boost Promo Code Satın Aldın! Özel Mesajlarını Kontrol Et.`)
            .setImage("https://media.tenor.com/ApVL8VtKO7wAAAAS/nitro-dodik.gif")
            .setFooter({ text: "Yetkililerimiz En Yakın Sürede Sana Hediyeni Verecek Dostum!", iconURL: interaction.user.avatarURL({ dynamic: true }) })


        const nitroFatura = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Faturanız:")
            .setURL("https://discord.gg/uranyum")
            .setDescription(`Alınan Ürün: <a:NitroBoost:1072579131134459944>  3 Aylık Nitro Boost Promo Code \nAlıcı: ${interaction.user.tag}\nSatıcı: Uranyum Discord\nÖdenen Ucr: 2.500.000\n\n**Not:** Almış Olduğun Ürün **48 Saat** İçerisinde Yetkililer Tarafından **Özel Mesaj** Olarak Atılacaktır.`)

        interaction.user.send({ embeds: [nitroFatura] }).catch((e) => { })

        // Lourity - discord.gg/uranyum
        louritydb2.push(`hediyeler_${interaction.user.id}`, "nitro")
        louritydb.add(`kredi_${interaction.user.id}`, -2500000)
        interaction.reply({ embeds: [nitro] }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

        const sell = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Yeni Bir Satın Alım!")
            .setDescription(`<a:NitroBoost:1072579131134459944>    ${interaction.user.tag} Adlı Üye **3 Aylık Nitro Boost Promo Code ** Satın Aldı!`)
            .addFields(
                { name: "Kullanıcı Adı:", value: `${interaction.user.tag}`, inline: true },
                { name: "Kullanıcı Etiket:", value: `<@${interaction.user.id}>`, inline: true }
            )
            .setThumbnail(interaction.user.avsatarURL({ dynamic: true }))

        return channel.send({ content: `<@984365876155396138`, embeds: [sell], components: [row] }).catch((e) => { })
    }
    
    // Lourity - discord.gg/uranyum
    if (interaction.customId === "youtube" + interaction.user.id) {

        const kanal = config.SHOPLOG_CHANNEL
        const channel = client.channels.cache.get(kanal)

        if (!channel) return;

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bunu Yapmaya Çalışırken Bir Sorun Oluştu.")

        const kredi = louritydb.get(`kredi_${interaction.user.id}`)

        const basarisiz = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Dostum yeterli Miktarda Ucr (${kredi - 1000000 || "1000000"} $) Sahip Değilsin.\n💰 Ucr Miktarı: **${kredi || 0} Ucr**`)
        // Lourity - discord.gg/uranyum

        if (kredi < 5000 || !kredi) return interaction.reply({ embeds: [basarisiz], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

        const youtube = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Tebrikler! Youtube Premium (1 Ay) Paketini Satın Aldınız.")
            .setDescription(`<a:youtube:1070775222736789604>  ${interaction.user.username} Dostum Youtube Premium (1 Ay) Paketi Aldın! Özel Mesajlarını Kontrol Et.`)
            .setImage("https://media.tenor.com/tYIUpIiF-LIAAAAC/youtube-logo.gif")
            .setFooter({ text: "Yetkililerimiz En Yakın Sürede Sana Hediyeni Verecek Dostum!", iconURL: interaction.user.avatarURL({ dynamic: true }) })


        const youtubeFatura = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Faturanız:")
            .setURL("https://discord.gg/uranyum")
            .setDescription(`Alınan Ürün: <a:youtube:1070775222736789604> Youtube Premium (1 Ay) \nAlıcı: ${interaction.user.tag}\nSatıcı: Uranyum Discord\nÖdenen Ucr: 1.000.000\n\n**Not:** Almış Olduğun Ürün **48 Saat** İçerisinde Yetkililer Tarafından **Özel Mesaj** Olarak Atılacaktır.`)

        interaction.user.send({ embeds: [youtubeFatura] }).catch((e) => { })

        // Lourity - discord.gg/uranyum
        louritydb2.push(`hediyeler_${interaction.user.id}`, "youtube")
        louritydb.add(`kredi_${interaction.user.id}`, -1000000)
        interaction.reply({ embeds: [youtube] }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const sell = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Yeni Bir Satın Alım!")
            .setDescription(`<a:youtube:1070775222736789604> ${interaction.user.tag} Adlı Üye **Youtube Premium (1 Ay) ** Satın Aldı!`)
            .addFields(
                { name: "Kullanıcı Adı:", value: `${interaction.user.tag}`, inline: true },
                { name: "Kullanıcı Etiket:", value: `<@${interaction.user.id}>`, inline: true }
            )
            .setThumbnail(interaction.user.avatarURL({ dynamic: true }))

        return channel.send({ content: `<@984365876155396138`, embeds: [sell], components: [row] }).catch((e) => { })
    }
    // Lourity - discord.gg/uranyum
    
})


client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;

    let yetkili = config.STAFF

    if (interaction.customId === "onayla") {

        const yetki = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Bunu yapabilmek İçin <@&${yetkili}> Rolüne Sahip Olmalısın.`)

        if (!interaction.member.roles.cache.has(yetkili)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        const onaylandi = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`${interaction.user.tag} Adlı Yetkili Bir Üyeye Hediyesini Verdi!`)
            .setTimestamp()

        interaction.message.delete().catch((e) => { })
        return interaction.reply({ embeds: [onaylandi] }).catch((e) => { })

    }


    if (interaction.customId === "reddet") {

        const yetki = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Bunu Yapabilmek İçin <@&${yetkili}> Rolüne Sahip Olmalısın.`)

        if (!interaction.member.roles.cache.has(yetkili)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        const reddedildi = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`${interaction.user.tag} Adlı Yetkili Bir Üyeye Hediyesini Vermedi!`)
            .setTimestamp()

        interaction.message.delete().catch((e) => { })
        return interaction.reply({ embeds: [reddedildi] }).catch((e) => { })

    } 

    } 
)

client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === "guncelle10" + interaction.user.id) {
  
      let sayi = 1
      
      let content = client.users.cache.filter(x => (louritydb.fetch(`kredi_${x.id}`))|| 0)
    .sort((x,y) => (louritydb.fetch(`kredi_${y.id}`)|| 0) - (louritydb.fetch(`kredi_${x.id}`))|| 0)
    .map((x) => {
      return `${sayi++} **<@${x.id}>**: ${louritydb.fetch(`kredi_${x.id}`) || 0}`
    });
    
      const çaktırma123 = new EmbedBuilder()
      .setTitle(`En Çok Daveti Olan Kullanıcılar`)
      .setDescription(`${content.slice(0, 10).join("\n")}`)
      .setFooter({ text: `Davet kasarak 1.sıraya geçebilirsin 😉` })
  
  
      interaction.update({ embeds: [çaktırma123] }).catch(e => { })
  
    }
  })
