const { Client, Message, MessageEmbed } = require('discord.js');
const { afk } = require("../../utils/afk")


module.exports = {
    name: 'afk',
    memberpermissions: ["SEND_MESSAGES"],
    description: 'Put User in AFK',
      options:[
{
     name:"reason",
     description:"The reason of this ban",
     type:"STRING",
     required:true
},
],

    run: async (client, interaction, args) => {
              const reason = interaction.options.getString('reason') || args.join(" ") || 'No reason!';
        afk.set(interaction.user.id, [Date.now(), reason]);
        interaction.member.setNickname(`[AFK] ${interaction.user.username}`)
        interaction.editReply({content :`You have been set as AFK. \`${reason}\``})
    }
}