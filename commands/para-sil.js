const { Client, EmbedBuilder } = require("discord.js");
const louritydb = require("croxydb")

// Lourity - discord.gg/uranyum
module.exports = {
    name: "para-sil",
    description: "İstediğin kullanıcıya para eklersin.",
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Kime para eklemek istersin?",
            type: 6,
            required: true
        },
        {
            name: "miktar",
            description: "Ne kadar eklemek istersin?",
            type: 3,
            required: true
        },
    ],

    run: async (client, interaction) => {

        const user = interaction.options.getMember('kullanıcı')
        const miktar = interaction.options.getString('miktar')

        if (interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: "Dostum sen kurucu değilsin.", ephemeral: true })

        if (isNaN(miktar)) return interaction.reply({ content: "Girdiğin bir sayı olmalı!", ephemeral: true })

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Başarıyla ${user} kullanıcısından ${miktar} para silindi!`)

        louritydb.add(`kredi_${user.id}`, -miktar)
        return interaction.reply({ embeds: [embed] })
    }
}