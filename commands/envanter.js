const { Client, EmbedBuilder } = require("discord.js");
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
// Lourity - discord.gg/uranyum
module.exports = {
    name: "envanter",
    description: "Kişisel Envanterin",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanırken bir sorun oluştu.")

        let kredi = louritydb.get(`kredi_${interaction.user.id}`)
        let davet = louritydb.get(`davet_${interaction.user.id}`)
        let mesaj = louritydb.get(`mesaj_${interaction.user.id}`)
        let hediyeler = louritydb2.get(`hediyeler_${interaction.user.id}`)

        const param = new EmbedBuilder()
            .setColor("Random")
            .setTitle("          <a:kral:1070775273726951478>   Uranyum Cripto Coin  -  Envanterin  <a:kral:1070775273726951478>  ")
            .addFields(
                { name: "<:davet:1070775346921738272>  Davet Sayın:", value: `${davet || "0"} Davet`, inline: true },
                { name: "<a:money:1070775380161613937>  Ucr Miktarın:", value: `${kredi || "0"} Kredi`, inline: true },
                { name: "<a:mesaj:1070775332384276560>  Yazdığın Mesaj Miktarı:", value: `${mesaj || "0"}/5000 Mesaj`, inline: true },
                { name: "<a:hediye:1070775303766560931>  Aldığın Hediyeler:", value: `${hediyeler || "Hiç Hediyen Yok"}`, inline: true },
                { name: "<a:Davet_Et_Kazan:1070775365703827537>  Davetten Kazandığın:", value: `${davet * 20000 || "0"} Kredi`, inline: true },
                { name: "<a:Konfeti:1070775289652715540>  Ödül Almana Kalan Mesaj:", value: `${2500 - mesaj || "0"} Mesaj`, inline: true },
            )
            .setFooter({ text:`💚İnsanları Uranyum'a Davet Et&Sunucuda Sohbet Et, Ucr Kazan Ve /Market İle Harca 💚` })

        interaction.reply({ embeds: [param] }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })
    }
};