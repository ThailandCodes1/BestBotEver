const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
        name: "addmoney",
        category: "economy",
        description: "add money for a user",
	options: [
		{
			name: 'user',
			description: 'User to add moeny',
			type: 6,
      required : true,
		},
{
  			name: 'input',
  			description: 'amout to be added ',
  			type: 3,
  			required: true,
},
	],
  run: async(client, interaction, args)=> {
		const user = interaction.options.getMember('user')
    const input = interaction.options.getString('input');
          if(!interaction.member.permissions.has('ADMINSTRATOR')) return;
      if(user.user.bot) return interaction.editReply({content :`You can't use this command with bot.`});
        if (isNaN(input)) return interaction.editReply({content :"Enter a valid amount."});
        if(input.startsWith('-') ||input.startsWith('/') || input.startsWith('*') || input.startsWith('+')) return interaction.editReply({content : `${input} is not a valid number.`})
        if (input > 1000000) return interaction.editReply({content : "Limit: 1 million."})
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)
        let moneyEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Success:`)
            .setDescription(`User: ${user},\nAmount: ${args[1]},\nNew balance: ${bal}.`);
        interaction.editReply({embeds : [moneyEmbed]})

    }
}