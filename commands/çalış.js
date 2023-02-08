const { Client, EmbedBuilder } = require("discord.js");
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
const wait = require('node:timers/promises').setTimeout;
// Lourity - discord.gg/uranyum
module.exports = {
  name: "çalış",
  description: "Çalışarak para kazanırsın.",
  type: 1,
  options: [],

  run: async (client, interaction) => {

    let calisma_sure = louritydb2.get(`calisma_sure_${interaction.user.id}`)

    if (calisma_sure === true) {

      const sure = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`Bugünlük Çok Çalıştın Biraz Dinlen..`)

      interaction.reply({ embeds: [sure], ephemeral: true })

      setTimeout(() => {
        louritydb2.delete(`calisma_sure_${interaction.user.id}`)
      }, 3600000)
      return;
    }

    let miktarsonuç = Math.floor(Math.random() * 99) + 1
    var sebep = ["Tadilatçı Olarak Çalıştın (Karılara Dalma)", "Kazıkçı Emlakçı Olarak Çalıştın", "Kurucunun Aşçısı Olarak Çalıştın", "Kaplumbaga Terbiyecisi Olarak Çalıştın", "Dilendin İşsiz PZVnk", "Pazarda Zebceci Olarak Çalıştın", "Kurucunun S0l D4şş4 Olarak Çalıştın", "Ucr Oyuncusu Olarak Çalıştın", "OwO Oynayıcısı Olarak Çalıştın", "boş boş durdu"]
    var sebepsonuç = sebep[Math.floor(Math.random() * sebep.length)];

    const calis_embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`<@${interaction.user.id}>, ${sebepsonuç} ve **${miktarsonuç}** TL kazandı!`)

    louritydb2.set(`calisma_sure_${interaction.user.id}`, true)
    louritydb.add(`kredi_${interaction.user.id}`, miktarsonuç)
    return interaction.reply({ embeds: [calis_embed] })
  }
};