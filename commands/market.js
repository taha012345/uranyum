const { Client, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ms = require("ms")
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
// Lourity - discord.gg/uranyum
module.exports = {
    name: "market",
    description: "Ucr Harcamanın En İyi Marketi!",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("<a:Spotify:1051513143731433564> ")
                    .setLabel("Spotify")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("spotify" + interaction.user.id)
            )
                   
            .addComponents(
                 new ButtonBuilder()
                    .setEmoji("<a:prime_owo:1071819602146889829> ")
                    .setLabel("OwO Cash")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("owocash" + interaction.user.id)
            )
            .addComponents(
                 new ButtonBuilder()
                    .setEmoji("<:_instagramming_:1071905242305802301> ")
                    .setLabel("İnstagram")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("instagram" + interaction.user.id)
                    
            )
            .addComponents(
                 new ButtonBuilder()
                    .setEmoji("<a:tiktok87:1072549445444575242>  ")
                    .setLabel("Tiktok")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("tiktok" + interaction.user.id)
              
            )
            .addComponents(
                 new ButtonBuilder()
                     .setEmoji("<a:NitroBoost:1072579131134459944> ")
                     .setLabel("NitroBoost")
                     .setStyle(ButtonStyle.Secondary)
                     .setCustomId("nitro" + interaction.user.id)        
                    )        

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanırken bir sorun oluştu.")

        let kredi = louritydb.get(`kredi_${interaction.user.id}`)

        const market = new EmbedBuilder()
            .setColor("5865f2")
            .setTitle(`Uranyum Market | Davet/Sohbet Et, Kazan! (${kredi || "0"} $)`)
            .setURL("https://discord.gg/uranyum")
            .setDescription(`**/günlük - Bedava Günlük Ucr Almayı Unutma!**`)
            .addFields(
                { name: "<a:Spotify:1051513143731433564> Spotify", value: `Spotify Premium (1 Ay) = 500.000 Ucr` },
                { name: "<a:youtube:1070775222736789604> Youtube", value: `Youtube Premium (1 Ay) |Stock Yok|= 1.000.000 Ucr` },
                { name: "<a:prime_owo:1071819602146889829> OwO Cash", value: `1 M OwO Cash = 1.000.000 Ucr` },
                { name: "<:_instagramming_:1071905242305802301> İnstagram", value: `İnstagram 1K(Begeni&Takipçi&İzlenme&Yorum) = 1.000.000 Ucr` },
                { name: "<a:tiktok87:1072549445444575242> Tiktok", value: `Tiktok 1K(Begeni&Takipçi&İzlenme&Yorum) = 1.000.000 Ucr` },
                { name: "<a:NitroBoost:1072579131134459944> NitroBoost", value: `NitroBoost(Hiç Nitro Alınmamış Hesaplar İçin Promosyon Kodu) = 2.500.000 Ucr` },
            )
            .setFooter({ text: "💚 İnsanları Uranyum'a Davet Et/Sohbet Et, Kredi Kazan 💚", iconURL: client.user.avatarURL() })
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()

        interaction.reply({ embeds: [market], components: [row] }).catch((e) => {
            // console.log(e) //hata olduğunda görmek için // ları silin
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

    }

};