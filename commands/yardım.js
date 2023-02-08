const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "yardım",
    description: "Yardım menüsünü açar!",
    type: 1,
    options: [],

    run: async (client, interaction) => {


        const embed = new EmbedBuilder()
        .setTitle("Botun yardım menüsüne hoşgeldin")
        .setThumbnail(interaction.user.avatarURL({ dynamic: true }) || "https://cdn.discordapp.com/attachments/1069609499956101130/1072954020458672209/c9375face0b6cf052ef985baa99c0e97.png" || null)
        .setDescription("<:giris:1063733266051497994> /çalış\n<:giris:1063733266051497994> /envanter\n<:giris:1063733266051497994> /günlük\n<:giris:1063733266051497994> /market\n<:giris:1063733266051497994> /para-ekle\n<:giris:1063733266051497994> /para-sil\n<:giris:1063733266051497994> /yazı-tura")
        .setFooter({text: "Wixua Tester"})

        interaction.reply({embeds: [embed]})


    }
}