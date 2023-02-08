const { Client, EmbedBuilder } = require("discord.js");
const ms = require("ms")
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
// Lourity - discord.gg/uranyum
module.exports = {
    name: "günlük",
    description: "Günlük Ucr almayı unutma.",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanırken bir sorun oluştu.")


        const slowmode = 8.64e+7,

            amount = Math.floor(Math.random() * 1000) + 4000;

        const lastDaily = await louritydb2.get(`gunluk_${interaction.user.id}`)

        if (lastDaily !== null && slowmode - (Date.now() - lastDaily) > 0) {

            const time = ms(slowmode - (Date.now() - lastDaily));

            const sure = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`Dostum Günlük Kazan Ödülünü Zaten Almışsın.\nTekrar Ödül Alabilmek İçin **${time}** Süre Boyunca Beklemelisin.`)

            return interaction.reply({ embeds: [sure], ephemeral: true }).catch((e) => {
                return interaction.reply({ embeds: [hata], ephemeral: true })
            })
        }


        const krediler = ["331", "111", "241", "11", "191", "100", "1352", "310", "832", "911" , "888" , "563" , "763" , "1152"]
        const random = krediler[
            Math.floor(Math.random() * krediler.length)
        ]


        const colors = ["f74092", "Green", "Yellow", "88fae7", "eb9f86", "30c08b"]
        const randomone = colors[
            Math.floor(Math.random() * colors.length)
        ]


        const gunluk = new EmbedBuilder()
            .setColor(`${randomone}` || "Green")
            .setDescription(`Tebrikler! Günlük Ödülünü Kaçırmadın :3\nTam Olarak Bizden **${random}** Ucr Kazandın!`)


        interaction.reply({ embeds: [gunluk] }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })
        louritydb.add(`kredi_${interaction.user.id}`, random)
        louritydb2.set(`gunluk_${interaction.user.id}`, Date.now())
    }

};