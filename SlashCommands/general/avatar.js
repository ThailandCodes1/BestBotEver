const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'Get user avatar',
	options: [
		{
			name: 'user',
			description: 'User to get avatar',
			type: 6,
		},
	],
run: async(client, interaction, args)=> {
		const member = interaction.options.getMember('user') || interaction.member;
		const isMemberAvatar = interaction.options.getBoolean('server_avatar');
		if (isMemberAvatar) {
			if (!member.avatar) {
				return interaction.editReply({
					content: ":x: This user don't has avatar in this server",
					ephemeral: true,
				});
			}
			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: member.user.tag, iconURL: member.avatarURL({ dynamic: true }) })
				.setDescription(`[Avatar Link](${member.avatarURL({ dynamic: true, size: 4096 })})`)
				.setImage(member.avatarURL({ dynamic: true, size: 4096 }))
				.setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
			return interaction.editReply({ embeds: [embed] });
		}
		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`[Avatar Link](${member.user.displayAvatarURL({ dynamic: true, size: 4096 })})`)
			.setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
			.setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
		interaction.editReply({ embeds: [embed] });
	},
};
