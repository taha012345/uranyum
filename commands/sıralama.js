const Discord = require("discord.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const Lourity = require("croxydb")
const fs = require("fs");
module.exports = {
    name: "sıralama",
    description: 'Sohbette istediğin kadar mesajı silersin!',
    type: 1,
    options: [],
    run: async (client, interaction) => {

        const button = new ActionRowBuilder()
        .addComponents(
         new ButtonBuilder()
            .setLabel("Yenile")
            //.setEmoji("↩️")
           .setStyle(2)
           .setCustomId("guncelle10" + interaction.user.id)
       )

  let sayi = 1
  
  let content = client.users.cache.filter(x => (Lourity.fetch(`kredi_${x.id}`))|| 0)
  .sort((x,y) => (Lourity.fetch(`kredi_${y.id}`)|| 0) - (Lourity.fetch(`kredi_${x.id}`))|| 0)
  .map((x) => {
    return `${sayi++} **<@${x.id}>**: ${Lourity.fetch(`kredi_${x.id}`) || 0}`
  });
  
  const leaderBoardEmbed = new EmbedBuilder()
    .setTitle(`En Çok Daveti Olan Kullanıcılar`)
    .setDescription(`${content.slice(0, 10).join("\n")}`)
    .setFooter({ text: `Davet kasarak 1.sıraya geçebilirsin 😉` })
    return interaction.reply({embeds:[leaderBoardEmbed], components: [button]})

}
}
