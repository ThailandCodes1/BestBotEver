const client = require("../index.js");
const { MessageEmbed } = require('discord.js');
client.on("interactionCreate", async (interaction) => {
await interaction.deferReply({ ephemeral: false }).catch(() => {});
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });
        const args = [];
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }


    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }






    // if(interaction.isButton()){
    //   console.log(interaction)
    //   interaction.reply({content:`${interaction.user.tag} clicked me!`})
    // }
    //     if(interaction.isSelectMenu()){
    //         await interaction.deferUpdate() 
    //   interaction.channel.send({content:`u choose ${interaction.values[0]}`})
    // }
});