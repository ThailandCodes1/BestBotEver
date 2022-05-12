const { MessageEmbed } = require(`discord.js`)
const os = require('os');
const pretty = require('pretty-ms')
module.exports = {
  name:"bot",
description: "Shows information about the bot",
run: async(client, interaction, args)=> {
var lol = ['782025091407282206']
var owner = ['721238929944346716']
const core = os.cpus()[0];
    const bot = new MessageEmbed()
      .setAuthor(`${client.user.tag}`, client.user.avatarURL())
      .addField('𝐁𝐨𝐭 𝐍𝐚𝐦𝐞', `${client.user.username}`, true)
      .addField('𝐁𝐨𝐭 𝐓𝐚𝐠', `#${client.user.discriminator}`, true)
      .addField('𝐁𝐨𝐭 𝐈𝐃', `${client.user.id}`, true)
      .addField('𝐁𝐨𝐭 𝐌𝐞𝐧𝐭𝐢𝐨𝐧', `<@${client.user.id}>`, true)
      .addField('𝐁𝐨𝐭 𝐏𝐫𝐞𝐟𝐢𝐱', `/`, true)
      .addField('𝐁𝐨𝐭 𝐏𝐢𝐧𝐠', `${client.ws.ping}`, true)
      .setFooter(`𝐀𝐬𝐤𝐞𝐝 𝐁𝐲 : ${messageCreate.author.tag}`, messageCreate.author.avatarURL())
await interaction.editReply({embeds: [botinfo]})   
}
}

