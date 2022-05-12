const { Client, Message, MessageEmbed } = require('discord.js');


module.exports = {
    name: 'unafk',
    memberpermissions: ["SEND_MESSAGES"],
    description: 'Remove AFK',

    run: async (client, interaction, args) => {
        interaction.member.setNickname(`${interaction.user.username}`)
        interaction.editReply({content :`Welcom Back.`})
    }
}