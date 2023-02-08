const { Client, EmbedBuilder } = require("discord.js");
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    name: "yazı-tura",
    description: "Katla Parayı Al Karıyı!",
    type: 1,
    options: [
        {
            name: "miktar",
            description: "İkiye katlamak istediğin para miktarını gir.",
            type: 4,
            required: true,
        },

    ],

    run: async (client, interaction) => {

        let kredi = louritydb.get(`kredi_${interaction.user.id}`)

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanırken bir sorun oluştu.")
            let yaziTura = louritydb2.get(`yaziTura_${interaction.user.id}`)

            const limit = new EmbedBuilder()
                .setColor("Red")
                .setDescription("15 dakika içerisinde en fazla **50** kez para katlayabilirsin!")



        let kanal = "1018615216264708277"
        const channel = client.channels.cache.get(kanal)

        if (yaziTura === 30) {
            interaction.reply({ embeds: [limit], ephemeral: true }).catch((e) => {
                return interaction.reply({ embeds: [hata], ephemeral: true })
            })
            setTimeout(() => {
                louritydb2.delete(`yaziTura_${interaction.user.id}`)
                return channel.send({ content: `:tada: <@${interaction.user.id}> **/yazı-tura** komutunu tekrar kullanabilirsin!` }).catch((e) => { })
            }, 900000)
            return;
        }


        const noMoney = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Dostum maalesef hiç paran yok.\n**/günlük** yazarak günlük hediyeni alabilirsin!")

        if (!kredi || kredi === 0) return interaction.reply({ embeds: [noMoney], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        let money = interaction.options.getInteger('miktar')


        const gecersiz = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Dostum girdiğin bir sayı değil.")

        if (isNaN(money)) return interaction.reply({ embeds: [gecersiz], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const azPara = new EmbedBuilder()
            .setColor("Red")
            .setDescription("0 krediyi ikiye katlamak mı?")

        if (money === 0) return interaction.reply({ embeds: [azPara], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const cokPara = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Dostum 1000'Den Fazla Para Katlayamazsın.")

        if (money > 1000) return interaction.reply({ embeds: [cokPara], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const noMoney2 = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Dostum Maalesef O Kadar Paran Yok.\n💰 Ucr Miktarı: **${kredi || 0} Ucr**`)

        if (kredi < money) return interaction.reply({ embeds: [noMoney2], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const mapping = ["true", "false"]
        const randomMapping = mapping[Math.floor(Math.random() * mapping.length)]


        if (randomMapping === "true") {

            const kazandin = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Dostum **${money * 2} Ucr** Kazandın!\n💰 Ucr Miktarı: **${kredi + money * 1 || 0} Ucr**`)

            louritydb.add(`kredi_${interaction.user.id}`, money * 1)
            louritydb2.add(`yaziTura_${interaction.user.id}`, +1)
            return interaction.reply({ embeds: [kazandin] }).catch((e) => {
                return interaction.reply({ embeds: [hata], ephemeral: true })
            })
        }


        if (randomMapping === "false") {

            const kaybettin = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`Dostum Maalesef **${money} Ucr** Kaybettin.\n💰 Ucr Miktarı: **${kredi - money || 0} Ucr**`)

            louritydb.add(`kredi_${interaction.user.id}`, -money)
            louritydb2.add(`yaziTura_${interaction.user.id}`, +1)
            return interaction.reply({ embeds: [kaybettin] }).catch((e) => {
                return interaction.reply({ embeds: [hata], ephemeral: true })
            })
        }

    }
};