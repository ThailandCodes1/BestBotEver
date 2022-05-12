const { MessageEmbed } = require(`discord.js`)

module.exports = {
	name: 'ping',
	description: 'Get bot speed',
	timeout: 5000,
	run: async (client, interaction) => {
		const embed = new MessageEmbed()
			.setAuthor(`${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
			.setColor('RANDOM')
			.setTimestamp()
			.setDescription(
				`**Time:** ${Math.floor(interaction.createdTimestamp - interaction.createdTimestamp)} ms\n**API Ping:** ${
					client.ws.ping
				} ms`,
			);
		interaction.editReply({ embeds: [embed], content: `<@${interaction.user.id}>` });
	},
};
