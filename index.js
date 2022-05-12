require('events').EventEmitter.defaultMaxListeners = 50;
const { Discord, Client, Collection , MessageEmbed ,MessageActionRow,MessageButton, MessageAttachment } = require("discord.js");
const ms = require("ms")
const db = require('quick.db')
const fs = require("fs")
const axios = require('axios').default;
const prefix = "$"
const client = new Client({
    intents: 32767,
    
});

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)



client.on('ready' , () => {
  console.log(`[API] Logged in as ${client.user.username}`);
  console.log(`[API] Prefix > ${prefix} <`)
  client.user.setActivity(`Prefix Is :  > ${prefix} <`)
})
//////////////////////////////Uptime///////////////////////////////////////////////
setInterval(async() => {
  await axios.get("https://Lord-SlashCommands.obrogddvvdagdm.repl.co")
},300000)
///////////////////////////Some Consts////////////////////////////
const Color = ('#5865F2')
const now = new Date();
//////////////////////////////////////Owner/////////////////////////////////
const dev = ["782025091407282206"]
client.on("messageCreate", messageCreate => {
  if (messageCreate.content.startsWith(prefix + "name")) {
    if (!dev.includes(messageCreate.author.id)) return;
    let args = messageCreate.content.split(" ").slice(1).join(" ");
    if (!args) return;
    client.user.setUsername(args)
    messageCreate.react(`👍`).then(messageCreate.reply({ content: `✅ Success | My Name changed to \`${args}\``, allowedMentions: { repliedUser: false } })
)
  } 
});
//////////////////////////////////////Protection/////////////////////////////////
let antibots = JSON.parse(fs.readFileSync("./protection/antibots.json", "utf8"));
client.on("messageCreate", async messageCreate => {
  if (messageCreate.content.startsWith(prefix + "antibots on")) {
if(messageCreate.member.id !== messageCreate.guild.ownerId) return messageCreate.react('❌')
    const on = new MessageEmbed()
      .setDescription(`**AntiBots Has been enabled**`)
      .setFooter(client.user.tag, client.user.displayAvatarURL({ size: 256, format: 'png', dynamic: true }))
      .setTimestamp()
    await messageCreate.reply({ embeds: [on], allowedMentions: { repliedUser: false } })
    antibots[messageCreate.guild.id] = {
      onoff: "On"
    };
    fs.writeFile("./protection/antibots.json", JSON.stringify(antibots), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

client.on("messageCreate", async messageCreate => {
  if (messageCreate.content.startsWith(prefix + "antibots off")) {
if(messageCreate.member.id !== messageCreate.guild.ownerId) return messageCreate.react('❌')
    const off = new MessageEmbed()
      .setDescription(`**AntiBots Has been Disabled**`)
      .setFooter(client.user.tag, client.user.displayAvatarURL({ size: 256, format: 'png', dynamic: true }))
      .setTimestamp()
    await messageCreate.reply({ embeds: [off], allowedMentions: { repliedUser: false } })
    antibots[messageCreate.guild.id] = {
      onoff: "Off"
    };
    fs.writeFile("./protection/antibots.json", JSON.stringify(antibots), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

client.on("guildMemberAdd", user => {
  if (!antibots[user.guild.id])
    antibots[user.guild.id] = {
      onoff: "Off"
    };
  if (antibots[user.guild.id].onoff === "Off") return;
  if (user.user.bot) return user.kick()
fs.writeFile("./protection/antibots.json", JSON.stringify(antibots), err => {
  if (err)
    console.error(err).catch(err => {
      console.error(err);

})
})
})
//////////////////////////////////////Blacklist/////////////////////////////////
client.on("messageCreate", async messageCreate => {
  if (messageCreate.content.startsWith(prefix + "blacklist")) {
    if (!messageCreate.member.permissions.has("ADMINISTRATOR")) return messageCreate.reply({ content: `only adminstator can use this command`, allowedMentions: { repliedUser: false } })
    let user = messageCreate.mentions.users.first()
    if (!user) return messageCreate.reply({ content: `❌ Error | You need to mention a member`, allowedMentions: { repliedUser: false } })
    let data = db.get(`black_${user.id}`)
    if (data) return messageCreate.reply({ content: `❌ Error | This member already in blacklist`, allowedMentions: { repliedUser: false } })
    await db.set(`black_${user.id}`, user.id)
    await messageCreate.reply({ content: `✅ Success | ${user} Has Been added to blacklist`, allowedMentions: { repliedUser: false } })
  }
});

client.on("messageCreate", messageCreate => {
  if (messageCreate.content.startsWith(prefix + "unblacklist")) {
    if (!messageCreate.member.permissions.has("ADMINISTRATOR")) return messageCreate.reply({ content: `only adminstator can use this command`, allowedMentions: { repliedUser: false } })
    let args = messageCreate.content.split(" ").slice(1).join(" ")
    let user = messageCreate.mentions.users.first()
    if (!user) return messageCreate.reply({ content: `❌ Error | You need to mention a member`, allowedMentions: { repliedUser: false } })
    let data = db.get(`black_${user.id}`)
    if (!data) return messageCreate.reply({ content: `❌ Error | This member is not in blacklist`, allowedMentions: { repliedUser: false } })
    if (data) {
      db.delete(`black_${user.id}`)
      messageCreate.reply({ content: `✅ Success | ${user} Has Been removed from blacklist`, allowedMentions: { repliedUser: false } })
    }
  }
})





//////////////////////////////////////General/////////////////////////////////

client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.toLowerCase().startsWith("s") || messageCreate.content.toLowerCase().startsWith(prefix + "server")) {
    if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })

    const bst = messageCreate.guild.premiumSubscriptionCount;
let ServerLogo = messageCreate.guild.iconURL() ? `[Download Server Logo](${messageCreate.guild.iconURL()})` : "No Server Icon"
    let logo = messageCreate.guild.iconURL() ? messageCreate.guild.iconURL() : ""
    let server = new MessageEmbed()
      .setColor(Color)
.setImage(logo)
      .setThumbnail(messageCreate.author.avatarURL({ dynamic: true, size: 512 }))
      .addField("**Owner :**", `** <@!${messageCreate.guild.ownerId}> **`, true)
      .addField("**CreateAt :**", `** <t:${parseInt(messageCreate.guild.createdAt / 1000)}:R> **`, true)
      .addField(`**Channels :**`, `**${messageCreate.guild.channels.cache.size}**`, true)
      .addField(`**Members :**`, `**${messageCreate.guild.memberCount}**`, true)
      .addField(`**Bots :**`, `**${messageCreate.guild.members.cache.filter(member => member.user.bot).size}**`, true)
      .addField("**Emoji Count:**", `${messageCreate.guild.emojis.cache.size}`, true)
      .addField("**Roles Count :**", `${messageCreate.guild.roles.cache.size}`, true)
      .addField("**Boost Count :**", `${bst} 𝐁𝐨𝐨𝐬𝐭𝐬 `, true)
      .addField(`**Server ID :**`, `**${messageCreate.guild.id}**`, true)
.addField(`_ _`, `${ServerLogo}`, false)
      .setFooter(`${messageCreate.author.tag} `, messageCreate.author.avatarURL({ dynamic: true }), true)
      .setTimestamp(now)

    await messageCreate.reply({ embeds: [server], allowedMentions: { repliedUser: false } })
  }
})

client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.startsWith("P") || messageCreate.content.startsWith("p") || messageCreate.content.startsWith("بروفايل") || messageCreate.content.toLowerCase().startsWith(prefix + "profile")) {
    if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
    let user = messageCreate.mentions.users.first() || client.users.cache.get(messageCreate.content.split(' ')[1]) || messageCreate.author
    if (user.bot) return messageCreate.reply({ content: `Bot dont have a profile card`, allowedMentions: { repliedUser: false } })
    messageCreate.channel.send(`https://api.probot.io/profile/${user.id}`)
  }
});

client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.startsWith("A") || messageCreate.content.startsWith("a") || messageCreate.content.startsWith("افاتار") || messageCreate.content.toLowerCase().startsWith(prefix + "avatar")) {
    if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })

    let args = messageCreate.content.split(" ");
    let uus = messageCreate.mentions.users.first() || client.users.cache.get(messageCreate.content.split(' ')[1]) || messageCreate.author
    const avatar = new MessageEmbed()
    .setAuthor(`${messageCreate.author.tag}` , messageCreate.author.avatarURL())
      .setTitle('Avatar Link')
      .setURL(uus.displayAvatarURL({ size: 2048, dynamic: true }))
      .setImage(uus.avatarURL({ size: 1024, dynamic: true }))
    .setFooter(`Requested By ${messageCreate.author.tag}` , messageCreate.author.avatarURL())
    await messageCreate.reply({ embeds: [avatar], allowedMentions: { repliedUser: false } })

  }
})

client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.startsWith("u") || messageCreate.content.startsWith("U") || messageCreate.content.startsWith("user") || messageCreate.content.toLowerCase().startsWith(prefix + "user")){
    if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })


    let args = messageCreate.content.split(" ");
    let user = await messageCreate.mentions.members.first() || await messageCreate.guild.members.cache.get(args[1]);
    let member = messageCreate.member;
    if (!member) return;
        const MemLogo = messageCreate.author.displayAvatarURL({size: 4096, dynamic: true});
    const row1 = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle('LINK')
        .setURL(`https://discord.com/users/${messageCreate.author.id}`)
        .setEmoji('957805856244789268')
        .setLabel('Profile Link'))
    let embed1 = new MessageEmbed()
          .setAuthor(`${messageCreate.author.tag}` , messageCreate.author.avatarURL())
        .setImage(MemLogo)
      .addField("**𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞 :**", `**${messageCreate.author.username}**`, true)
      .addField("**𝐔𝐬𝐞𝐫 𝐓𝐚𝐠:**", `**#${messageCreate.author.discriminator}**`, true)
      .addField("**𝐔𝐬𝐞𝐫 ID:**", `**${messageCreate.author.id}**`, true)
      .addField("**Joined Discord :**", `** <t:${parseInt(messageCreate.author.createdAt / 1000)}:R> **`, true)
      .addField("**Joined Server :**", `** <t:${parseInt(member.joinedAt / 1000)}:R> **`, true)
            .addField(`_ _`, `[Download Avatar](${MemLogo})`, false)
.setFooter({
      text:`${client.user.username} • Asked by ${messageCreate.author.tag}`,
      iconURL: client.user.displayAvatarURL()
    })
    .setTimestamp()
    if (!user) return await messageCreate.channel.send({ embeds: [embed1], components: [row1] })
            const men = user.user.displayAvatarURL({size: 4096, dynamic: true});
    const row2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle('LINK')
        .setURL(`https://discord.com/users/${user.user.id}`)
        .setEmoji('957805856244789268')
        .setLabel('Profile Link'))
    let embed2 = new MessageEmbed()
          .setAuthor(`${user.user.tag}` , user.user.avatarURL())
        .setImage(men)
      .addField("**𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞 :**", `**${user.user.username}**`, true)
      .addField("**𝐔𝐬𝐞𝐫 𝐓𝐚𝐠:**", `**#${user.user.discriminator}**`, true)
      .addField("**𝐔𝐬𝐞𝐫 ID:**", `**${user.user.id}**`, true)
      .addField("**Joined Discord :**", `** <t:${parseInt(user.user.createdAt / 1000)}:R> **`, true)
      .addField("**Joined Server :**", `** <t:${parseInt(member.joinedAt / 1000)}:R> **`, true)
            .addField(`_ _`, `[Download Avatar](${men})`, false)
.setFooter({
      text:`${client.user.username} • Asked by ${messageCreate.author.tag}`,
      iconURL: client.user.displayAvatarURL()
    })
    .setTimestamp()
    if (user) return await messageCreate.channel.send({ embeds: [embed2], components: [row2] })
  }
})



client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.toLowerCase().startsWith(prefix + "banner"))  {
    if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })

    let args = messageCreate.content.split(" ");
    let user = await messageCreate.mentions.members.first() || await messageCreate.guild.members.cache.get(args[1]) || messageCreate.author
        if (user.bot) return messageCreate.reply({ content: `𝐁𝐨𝐭𝐬 𝐃𝐨𝐧'𝐭 𝐡𝐚𝐯𝐞 𝐚 Banner`, allowedMentions: { repliedUser: false } })
    const fetchUser = await client.users.fetch(user);
    await fetchUser.fetch(); // to get user banner you need to fetch user before getting banner
    const banner = new MessageEmbed()
      .setAuthor(fetchUser.tag, fetchUser.displayAvatarURL({ dynamic: true }))
      .setImage(fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
      .setFooter(`Requested by ${messageCreate.author.tag}`, messageCreate.author.displayAvatarURL({ dynamic: true }));
    await messageCreate.reply({ embeds: [banner], allowedMentions: { repliedUser: false } })
  }
})



const pretty = require('pretty-ms')
const os = require('os');
client.on('messageCreate', messageCreate => {
  if (messageCreate.content.toLowerCase().startsWith(prefix + 'bot')){
    if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })

    const bot = new MessageEmbed()
      .setAuthor(`${client.user.tag}`, client.user.avatarURL())
      .addField('𝐁𝐨𝐭 𝐍𝐚𝐦𝐞', `${client.user.username}`, true)
      .addField('𝐁𝐨𝐭 𝐓𝐚𝐠', `#${client.user.discriminator}`, true)
      .addField('𝐁𝐨𝐭 𝐈𝐃', `${client.user.id}`, true)
      .addField('𝐁𝐨𝐭 𝐌𝐞𝐧𝐭𝐢𝐨𝐧', `<@${client.user.id}>`, true)
      .addField('𝐁𝐨𝐭 𝐏𝐫𝐞𝐟𝐢𝐱', `${prefix}`, true)
      .addField('𝐁𝐨𝐭 𝐏𝐢𝐧𝐠', `${client.ws.ping}`, true)
      .setFooter(`𝐀𝐬𝐤𝐞𝐝 𝐁𝐲 : ${messageCreate.author.tag}`, messageCreate.author.avatarURL())
      .setTimestamp(now)
    messageCreate.reply({ embeds: [bot], allowedMentions: { repliedUser: false } })
  }
})







client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.toLowerCase().startsWith(prefix + 'members')) {
    if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
    let embed = new MessageEmbed()
      .setTitle(`**${messageCreate.guild.name}\' Member Count**`)
      .setDescription(`
  **Total Members : ${messageCreate.guild.memberCount}**
  **Humans : ${messageCreate.guild.members.cache.filter(m => !m.user.bot).size}**
  **Bots : ${messageCreate.guild.members.cache.filter(m => m.user.bot).size}**`)
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

    messageCreate.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
  }
})









client.on('messageCreate', messageCreate => {
  if (messageCreate.content.toLowerCase().startsWith(prefix + 'ping')) {
    if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
    const ping = new MessageEmbed()
      .setAuthor(`${messageCreate.author.tag}`, messageCreate.author.displayAvatarURL({ dynamic: true }))
      .setColor('RANDOM')
      .setTimestamp()
      .setDescription(
        `**Time:** ${Math.floor(messageCreate.createdTimestamp - messageCreate.createdTimestamp)} ms\n**API Ping:** ${client.ws.ping
        } ms`,
      );
    messageCreate.reply({ embeds: [ping], allowedMentions: { repliedUser: false } })
  }
})




client.on("messageCreate", messageCreate => {
    if (messageCreate.content.startsWith(prefix + 'tax')) {
          if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
        let num = messageCreate.content.split(" ").slice(1).join(" ");
          var numerr = Math.floor(num);
          var tax = 5.3; 
        if(1 >= num) {
          return messageCreate.reply(`\n>>> **:rolling_eyes: ${prefix}tax 2**`)
        } else
        if(num > 99999999999999999999) {
          return messageCreate.reply({content : `**يجب ان يكون الرقم صحيح**`})
        }
        if (!num) return messageCreate.reply(`**Usage** : $s{prefix}tax 5000**`)
          var taxval = Math.floor(numerr * (tax / 100));
    var amount = Math.floor(numerr - taxval);
    var amountfinal = Math.floor(numerr + taxval);
          let embed = new MessageEmbed()
      .setTitle("ضريبة برو بوت")
      .setColor('#a31010')
      .addField(`المبلغ:`, ` ${numerr} `)
      .addField(`النسبه الي يسحبها البوت:`, ` ${tax}% `)
      .addField(`المبلغ الي يسحبه البوت:`, ` ${taxval}`)
      .addField(`المبلغ منغير الضريبة:`, `  ${amount} `)
      .addField(`كم لازم تحول عشان يوصل المبلغ بالضبط:`, `  ${amountfinal} `)
      .setTimestamp()
      .setThumbnail(messageCreate.guild.iconURL({ dynamic: true }))
      .setImage('https://media.discordapp.net/attachments/964961138527854732/964975726338125854/Line-2.png')
      .setFooter({text: `Requested by: ${messageCreate.author.username}`, iconURL: messageCreate.author.avatarURL({ dynamic: true })})
    messageCreate.channel.send({embeds : [embed]})
    }
})







//////////////////////////////Stafff//////////////////////////////////

client.on("messageCreate", async messageCreate => {
  if (messageCreate.content.startsWith(prefix + "timeout")) {
    if (messageCreate.member.permissions.has("ADMINISTRATOR")) {
      let args = messageCreate.content.split(" ")
      let member = messageCreate.mentions.members.first() || messageCreate.guild.members.cache.get(args[1])
      if (!member) return messageCreate.reply({ content: `**Mention the user or him ID to shut him up !**`, allowedMentions: { repliedUser: false } })
      if (member.user.bot) return messageCreate.reply({ content: `****You can't mute a bot 🙄**!**`, allowedMentions: { repliedUser: false } })
      if (member.user == messageCreate.author) return messageCreate.reply({ content: `****You can't mute a bot 🙄**!**`, allowedMentions: { repliedUser: false } })
      if (!args[2]) return messageCreate.reply({ content: `**Please Specify the timer ❌**`, allowedMentions: { repliedUser: false } })
      if (!args[2].endsWith("s")) {
        if (!args[2].endsWith("m")) {
          if (!args[2].endsWith("h")) {
            if (!args[2].endsWith("d")) {
              if (!args[2].endsWith("w")) {
                return messageCreate.reply({ content: `**Please Provide me a valid timer \`s / m / h / d / w\` ❌**`, allowedMentions: { repliedUser: false } })
              }
            }
          }
        }
      }
      if (isNaN(args[2][0])) return messageCreate.reply({ content: `**That is not a number ❌ !**`, allowedMentions: { repliedUser: false } })
      let embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`> **You are muted in** \`${messageCreate.guild.name}\` **for a ${args[2]}**\n> **Muted By : **${messageCreate.author}`)
        .setThumbnail(messageCreate.guild.iconURL())
        .setFooter(messageCreate.author.tag, messageCreate.author.displayAvatarURL({ dynamic: true }))
      await member.timeout(ms(args[2]))
      await messageCreate.reply(`**${messageCreate.author.tag}** Timeouted **${member.user.username}** for **${args[2]}**`)
      await member.user.send({ embeds: [embed], allowedMentions: { repliedUser: false } })
    }
  }
});

client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.toLowerCase().startsWith(prefix + 'untimeout')) {
    if(!messageCreate.member.permissions.has("ADMINISTRATOR")) return;
    let args = messageCreate.content.split(" ")
    let member = messageCreate.mentions.members.first() || messageCreate.guild.members.cache.get(args[1])
    if (!member) return messageCreate.reply("**Mention the user or him ID !**")
    if (member.user.bot) return messageCreate.reply("**You can't mute a bot 🙄**");
    if (member.user == messageCreate.author) return messageCreate.reply("**You can't mute yourself 🙄**")
    if (!messageCreate.member.permissions.has("MUTE_MEMBERS")) return messageCreate.reply({ content: `**You do not have permissions to use this command**`, allowedMentions: { repliedUser: false } })
    if (!member.isCommunicationDisabled()) {
      return messageCreate.reply({ content: `**❌ This user is not in timeout.**`, allowedMentions: { repliedUser: false } })
        .catch((e) => { });
    }
    await member.disableCommunicationUntil(null, `By: ${member.tag}`);
    messageCreate.reply({ content: `Timeout has been removed from ${member}`, allowedMentions: { repliedUser: false } })
  }
})

client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.toLowerCase().startsWith(prefix + 'roleinfo')) {
    if(!messageCreate.member.permissions.has("MANAGE_ROLES")) return messageCreate.reply({ content: `You Need \`MANAGE_ROLES\` permission to use this command `, allowedMentions: { repliedUser: false } })
    let role = await messageCreate.mentions.roles.first()
    if (!role) return messageCreate.reply({ content: `You need to mention a role`, allowedMentions: { repliedUser: false } })
    const status = {
      false: "**No**",
      true: "**Yes**"
    }
    let roleembed = new MessageEmbed()
      .setAuthor("Role Info")
      .setThumbnail(messageCreate.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
      .addField(":id: ID", `\`${role.id}\``)
      .addField(":id: Name", `**${role.name}**`)
      .addField(":white_circle: Hex", `**${role.hexColor}**`)
      .addField(":busts_in_silhouette: Members", `**${role.members.size}**`)
      .addField(":dividers: Position", `**${role.position}**`)
      .addField(":pushpin: **Mentionable**", `**${status[role.mentionable]}**`)
      .setTimestamp()

    messageCreate.reply({ embeds: [roleembed], allowedMentions: { repliedUser: false } })
  }
})

client.on("messageCreate", async messageCreate => {
if(messageCreate.content.startsWith(prefix + "mute")) {
if(!messageCreate.member.permissions.has('MUTE_MEMBERS')) {
messageCreate.channel.send('You Dont Have `MUTE_MEMBERS` Permission ');
return;
};
  /*
if(!messageCreate.guild.client.user.permissions.has('MUTE_MEMBERS')) {
messageCreate.channel.send('You Dont bot `MUTE_MEMBERS` Permission ');
return;
}
  */
if(messageCreate.content.startsWith ()) return;
const role = messageCreate.guild.roles.cache.find(role => role.name === 'Muted');
if(!role)  {
messageCreate.guild.roles.create({data: { 
name: 'Muted',
permissions: [],
color: 'blue'}})}
const tag = messageCreate.mentions.members.first() 
let args = messageCreate.content.split(" ")
if(!tag) { 
messageCreate.channel.send(">>> ❌ **Please mention the user**")
return;
}

tag.roles.add(role).then((m) => {
    messageCreate.reply({ content: `✅ **Success | @${tag.user.username} muted from the text! 🤫 ** `, allowedMentions: { repliedUser: false } })
var time = args[2]
setTimeout(() => {
tag.roles.remove(role);
}, ms(time))
return 
})}})

client.on("messageCreate", async messageCreate => {
if(messageCreate.content.startsWith(prefix + "unmute")) {
if(!messageCreate.member.permissions.has('MUTE_MEMBERS')) return messageCreate.channel.send('You Dont Have `MUTE_MEMBERS` Permission ');

const tag = messageCreate.mentions.members.first() 
if(!tag) return messageCreate.channel.send(">>> ❌ **Please mention the user**")
const rr = messageCreate.guild.roles.cache.find(rr => rr.name === 'Muted');
if(!rr) return messageCreate.reply({ content: `❌ **${tag.user.username} Is not Muted !!** `, allowedMentions: { repliedUser: false }})

tag.roles.remove(rr).then((m) => {             
messageCreate.reply({ content: `✅ ${tag.user.username} unmuted!`, allowedMentions: { repliedUser: false }})
})
}
})

client.on("messageCreate" , async messageCreate => {
  if (messageCreate.content.startsWith(prefix + 'clear') ||messageCreate.content.startsWith('مسح')) {
if(messageCreate.member.permissions.has("ADMINISTRATOR")) {
let args = messageCreate.content.split(" ").slice(1)
let messagecount = parseInt(args);
if (args > 100) return messageCreate.channel.send(
new MessageEmbed()
.setDescription(`\`\`\`js
i cant delete more than 100 messages 
\`\`\``)
).then(messages => messages.delete({ timeout: 8000 }))
if (!messagecount) messagecount = '100';
messageCreate.channel.messages.fetch({ limit: 100 }).then(messages => messageCreate.channel.bulkDelete(messagecount)).then(messages => {
const embed = new MessageEmbed()
.setAuthor(messageCreate.author.tag, messageCreate.author.displayAvatarURL({ dynamic: true, size: 1024 }))
.setDescription(`\`\`${messages.size} messages was deleted \`\``)
.setColor("#ff0000")
messageCreate.channel.send({embeds : [embed]}).then(messageCreate => {
  setTimeout(() => messageCreate.delete(), 5000)
})

})
}
}
})

 let Owners = ['782025091407282206']
client.on('messageCreate', messageCreate =>{
  if(messageCreate.content.startsWith(prefix+'create')){
  if(!Owners.includes(messageCreate.author.id)) return;
  let user = messageCreate.mentions.members.first();
  if(!user)return messageCreate.reply({content: '> **Set the user**'});
  let time = messageCreate.content.split(" ")
  if(!time)return messageCreate.reply({content: '> **Set Channel time**'});
  messageCreate.reply({content: `> **Done create the chanenl \`${user.user.username}-room\`**`})
  let everyone = messageCreate.guild.roles.cache.find(role => role.name === '@everyone');
    messageCreate.guild.channels.create(`${user.user.username}-room`,{type: 'GUILD_TEXT'}).then(nah =>{
    let embed = new MessageEmbed()
    .setThumbnail(messageCreate.guild.iconURL({dynamic:true}))
    .setTimestamp()
    .setTitle(messageCreate.guild.name)
    .addField(`صاحب الروم:`, `${user}`, false)
    .addField(`منشأء الروم`,`${messageCreate.author}`,false)
    .addField(`ينتهي في: `,`${time[2]}`)
    .setColor("BLUE")
    nah.send({embeds:[embed] , content : `${user}` })
    nah.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true, SEND_messageCreateS: true});
    nah.permissionOverwrites.edit(everyone, { VIEW_CHANNEL: true,SEND_messageCreateS: false }).then(setTimeout(() => {
      nah.delete();
    }, ms(time[2])))
})
}
})

client.on('messageCreate',async messageCreate=>{
    const args = messageCreate.content.slice(0).trim().split(/ +/);
    if(args[0] != prefix + "role") return
    if (!messageCreate.member.permissions.has("MANAGE_ROLES")) return
    if (!args[1]) return messageCreate.reply("**you must mention a member!!**")
    const member = messageCreate.mentions.members.first() || messageCreate.guild.members.cache.get(args[0]);
    if (!member) return messageCreate.reply(`i can't find this user`)
    if (!args[2]) return messageCreate.reply("**you must mention a role!!**")
    let rolementions = messageCreate.content.split(' ').slice(2).join(' ')
    console.log(rolementions)
    let role = messageCreate.guild.roles.cache.find(ro => ro.id === rolementions)  || messageCreate.mentions.roles.first() || messageCreate.guild.roles.cache.find(ro => ro.name.toLowerCase().includes(rolementions.toLowerCase()))
    if (!role) return messageCreate.reply(`I can't fine this role **${rolementions}**`)
    
    if(messageCreate.member.roles.highest.comparePositionTo(role) < 1 && messageCreate.author.id != messageCreate.guild.ownerId) return messageCreate.reply("**this role is higher than you**")
    if (!member.roles.cache.some(ro => ro.id === role.id))
    {
      member.roles.add(role);
      const add = new MessageEmbed()
      .setDescription(`✅ Changed roles for ${member.user.username}, **+${role.name}**`)
      .setColor('#00ff07')
    messageCreate.reply({ embeds: [add], allowedMentions: { repliedUser: false } })
    }
    else
    {
      member.roles.remove(role);
      const remove = new MessageEmbed()
      .setDescription(`✅ Changed roles for ${member.user.username}, **-${role.name}**`)
      .setColor('#00ff07')
    messageCreate.reply({ embeds: [remove], allowedMentions: { repliedUser: false } })
    }
})

client.on("messageCreate" , messageCreate => {
if(messageCreate.content.startsWith(prefix + "roles")) {
if(messageCreate.member.permissions.has("ADMINISTRATOR")) {
let member = messageCreate.mentions.members.first()
if(!member) return messageCreate.reply()({ content : `**Please Mention The User ! ❌**`, allowedMentions: { repliedUser: false } })

let roles1 = member.roles.cache.filter((roles) => roles.id !== messageCreate.guild.id).map((role) => role.toString()).join(`\n`) ;

let embed = new MessageEmbed()
.setTitle(`This is all roles for ${member.user.username} :`)
.setDescription(`${roles1}`)
.setColor("333333")

    messageCreate.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
}}
});

client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.startsWith(prefix + 'lock') ||
    messageCreate.content.startsWith(prefix + 'قفل')) {
    if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
    if (!messageCreate.member.permissions.has("MANAGE_CHANNELS")) return messageCreate.channel.send(`** ليس لديك صلاحية لإستعمال الأمر ! 🙄 **`);
    let channel = messageCreate.mentions.channels.first();
    let channel_find = messageCreate.guild.channels.cache.find(ch => ch.id == channel);
    if (!channel) channel_find = messageCreate.channel;
    if (!channel_find) return;
    await messageCreate.channel.permissionOverwrites.edit(messageCreate.author , {  SEND_messageCreateS: false, VIEW_CHANNEL: true});
    messageCreate.reply({ content : `🔒 <#${channel_find.id}> **has been locked.**`, allowedMentions: { repliedUser: false } })
  }
});

client.on('messageCreate', async messageCreate => {
  if (messageCreate.content.startsWith(prefix + 'unlock') ||messageCreate.content.startsWith(prefix + 'فتح')) {
    if (db.has(`black_${messageCreate.author.id}`)) return messageCreate.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
    if (!messageCreate.member.permissions.has("MANAGE_CHANNELS")) return messageCreate.channel.send(`** ليس لديك صلاحية لإستعمال الأمر ! 🙄 **`);
    let channel = messageCreate.mentions.channels.first();
    let channel_find = messageCreate.guild.channels.cache.find(ch => ch.id == channel);
    if (!channel) channel_find = messageCreate.channel;
    if (!channel_find) return;
    await messageCreate.channel.permissionOverwrites.edit(messageCreate.author , {  SEND_messageCreateS: true, VIEW_CHANNEL: true});
  messageCreate.reply({ content : `🔓 <#${channel_find.id}> **has been unlocked.**`, allowedMentions: { repliedUser: false } })
  }
});


client.on('messageCreate', async (messageCreate) => {
  if(messageCreate.content.toLowerCase().startsWith(prefix + 'hide')) {
        if (!messageCreate.member.permissions.has("MANAGE_CHANNELS")) return messageCreate.reply({ content : `** Missing Permission(s) : \`MANAGE_CHANNELS\` 🙄 **`, allowedMentions: { repliedUser: false } })
    let men = messageCreate.guild.roles.cache.find(role => role.name === '@everyone');
    if(!men) return;
    await messageCreate.channel.permissionOverwrites.edit(men , { VIEW_CHANNEL: false });
    await messageCreate.reply({ content : `Now , NoBody can See <#${messageCreate.channel.id}> !! `, allowedMentions: { repliedUser: false } })
  }
});

client.on('messageCreate', async (messageCreate) => {
  if(messageCreate.content.toLowerCase().startsWith(prefix + 'show')) {
        if (!messageCreate.member.permissions.has("MANAGE_CHANNELS")) return messageCreate.reply({ content : `** Missing Permission(s) : \`MANAGE_CHANNELS\` 🙄 **`, allowedMentions: { repliedUser: false } })
    let men = messageCreate.guild.roles.cache.find(role => role.name === '@everyone');
    if(!men) return;
    await messageCreate.channel.permissionOverwrites.edit(men , { VIEW_CHANNEL: true });
    await messageCreate.reply({ content : `Now , can **everyone** See <#${messageCreate.channel.id}> !! `, allowedMentions: { repliedUser: false } })

  }
});

client.on('messageCreate', async(messageCreate) => {
      if(!messageCreate.guild) return;
if(messageCreate.content.startsWith(prefix + 'ban')){
    if(!messageCreate.member.permissions.has('ADMINISTRATOR')) return;
      let args = messageCreate.content.split(" ");
    let user = await messageCreate.mentions.members.first() || await messageCreate.guild.members.cache.get(args[1]);
    if(!user) return messageCreate.reply(`❌ Please specify a user to banned.`);
    if(!user.bannable) return messageCreate.channel.send(`${user} Is unbannedable`);
    if(messageCreate.guild.ownerId === user.id) return messageCreate.channel.send(`${user} Is unbannedable`);
    if(user.roles.highest.position > messageCreate.member.roles.highest.position) return messageCreate.reply(`${user}'s Roles are higher than yours`)
    if(user.roles.highest.position === messageCreate.member.roles.highest.position) return messageCreate.reply(`You have the same roles as ${user}'s`);

    try {
        user.ban({
            reason: `Has been banned by ${messageCreate.member.username}`
        });

        messageCreate.channel.send(`✅ ${user.user.username} banned from the server!.`);
    } catch (error) {
        return;
    }


  
}
})

client.on("messageCreate", messageCreate => {
    let command = messageCreate.content.split(" ")[0];
    if (command == prefix + "unban") {
        if(!messageCreate.member.permissions.has('BAN_MEMBERS')) return messageCreate.reply('❌ You Dont Have Premission \`Ban\`');
        if(!messageCreate.guild.me.permissions.has('BAN_MEMBERS')) return messageCreate.reply('❌ I Dont Have Premission \`Ban\`');
              let user = messageCreate.content.split(" ").slice(1).join(" ");
            if (!user) return messageCreate.channel.send({content : `❌ Wrong Usage !!  \n Usage : \`${prefix}unban user_id\``})
      messageCreate.guild.members.unban(user).then(m => {
        messageCreate.channel.send(`☑️ ${m.username} Unbanned ! `);
    }).catch(err => {
            messageCreate.channel.send(`> ❌ Err Can't Found \`${user}\` In The List`);
        });
    }
});

client.on("messageCreate", async message => {
    let command = message.content.split(" ")[0];
    if (command == prefix + "kick") {
              if(!message.member.permissions.has('KICK_MEMBERS')) return message.reply('❌ You Dont Have Premission \`KICK\`');
        if(!message.guild.me.permissions.has('KICK_MEMBERS')) return message.reply('❌ I Dont Have Premission \`KICK\`');
            let args = message.content.split(" ");
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (!user) return message.channel.send({content : `❌ Wrong Usage !!  \n Usage : \`${prefix}kick @user / user_id\``})
  
  try {
  await user.kick()
  await message.channel.send(`✅ @${user.user.usename} has been kicked !`);
  } catch (er) {
  await message.channel.send('Error');
  }}
})

/////////////////////////////Bank///////////////////////
client.on('messageCreate' , async message => {
  if(message.content.startsWith(prefix + 'balance')){
                let args = message.content.split(" ")
        let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]) ||
      message.guild.members.cache.find(r =>r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()) ||message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()) ||message.member;
      if(user.user.bot) return message.channel.send({content :`You can't use this command with bot.`});
    let bal = db.fetch(`money_${user.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${user.id}`);

    if (bank === null) bank = 0;

    if (user) {

      let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(
          `${user.user.username}'s Balance\n\nPocket: \`${bal}\`\nBank: \`${bank}\``
        )
      message.channel.send({embeds : [embed]})
    } else {
      return message.channel.send({content :"Invalid user."})
    
    }
  }
})

client.on('messageCreate' , async message => {
  if(message.content.startsWith(prefix + 'daily')){
                    let args = message.content.split(" ")
            let user = message.member;
        let timeout = 86400000;
        var amount = Math.floor(Math.random() * 5000)
        let daily = await db.fetch(`daily_${user.user.id}`);
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You can collect your daily again in ${time}.`);
            message.reply({ embeds: [timeEmbed] })
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You've collected your ${amount} from daily.`);
            message.reply({ embeds: [moneyEmbed] })
            db.add(`money_${user.user.id}`, amount)
            db.set(`daily_${user.user.id}`, Date.now())
        }
  }
})

client.on('messageCreate' , async message => {
  if(message.content.startsWith(prefix + 'deposit')){
        let args = message.content.split(" ").slice(1)
            let user = message.member;
        let member = db.fetch(`money_${user.id}`)
        if (args[0] == 'all') {
            let money = await db.fetch(`money_${user.id}`)
            let embedbank = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription("❌ You don't have money to deposit.")
            if (!money) return message.reply({ embeds: [embedbank] })

            db.subtract(`money_${user.id}`, money)
            db.add(`bank_${user.id}`, money)
            let sembed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`✅ You have deposited all your coins.`);
            message.reply({ embeds: [sembed] })

        } else {
            let embed6 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`This amount ia not a number.`)

            if (isNaN(args[0])) {
                return message.reply({ embeds: [embed6] })

            }
            let embed4 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You don't have enough money.`);

            if (member < args[0]) {
                return message.reply({ embeds: [embed4] })
            }

            let embed5 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You have deposited ${args[0]} into bank.`);

            message.reply({ embeds: [embed5] })
            db.subtract(`money_${user.id}`, args[0])
            db.add(`bank_${user.id}`, args[0])

        }
  }
})

client.on('messageCreate' , message => {
  if(message.content.startsWith(prefix + 'top')){
            let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
        if (!money.length) {
            let noEmbed = new MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setFooter("What do you think to get your daily?")
            return message.reply({embeds : [noEmbed]})
        };

        money.length = 10;
        var finalLb = "";
        for (var i in money) {
            if (money[i].data === null) money[i].data = 0
            finalLb += `**${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]) : "Unknown User#0000"}** - ${money[i].data} :dollar:\n`;
        };

        const embed = new MessageEmbed()
            .setTitle(`Leaderboard Of ${message.guild.name}`)
            .setColor("RANDOM")
            .setDescription(finalLb)
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setTimestamp()
        message.reply({embeds :[embed]});
    }
  })

client.on('messageCreate' , message => {
  if(message.content.startsWith(prefix + 'bankpro')){
                        let args = message.content.split(" ")
        let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]) ||
      message.guild.members.cache.find(r =>r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()) ||message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()) ||message.member;
      if(user.user.bot) return message.reply({content :`You can't use this command with bot.`});

        let money = db.fetch(`money_${user.id}`)
        if (money === null) money = 0;

        let bank = db.fetch(`bank_${user.id}`)
        if (bank === null) bank = 0;

        let bio = db.fetch(`info_${user.id}`);
        if (bank === null) bio = `${prefix}setbio`

        let bronze = db.fetch(`bronze_${user.id}`);
        if (bronze === null) bronze = 0;

        let silver = db.fetch(`silver_${user.id}`);
        if (silver === null) silver = 0;

        let diamond = db.fetch(`diamond_${user.id}`)
        if (diamond === null) diamond = 0;

        let cars = db.fetch(`car_${user.id}`);
        if (cars === null) cars = 0;

        let house = db.fetch(`house_${user.id}`);
        if (house === null) cars = 0;

        let ring = db.fetch(`ring_${user.id}`);
        if (ring === null) ring = 0;

        const embed = new MessageEmbed()
        .setColor(`RANDOM`)
        .setDescription(`> User: ${user} | ${user.user.tag} | ${user.id}\n> Money: ${money}\n> Bank: ${bank}\n> Bronze ranks: ${bronze}\n> Silver ranks: ${silver}\n> Diamond ranks: ${diamond}\n> Cars: ${cars}\n> Houses: ${house}\n> Rings: ${ring}\n__Bio__: ${bio}`)

        message.reply({embeds : [embed]})
    
  }
})

const { chunk } = require('./functions');
client.on('messageCreate' , async message => {
  if(message.content.startsWith(prefix + 'setbio')){
            let args = message.content.split(" ").slice(1)
            let user = message.author;
        if (!args[0]) {
            let fetchInfo = await db.fetch(`info_${user.id}`)
            if (fetchInfo) {
                let embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor('Current bio:', message.author.displayAvatarURL())
                    .setDescription(`\`${fetchInfo}\``)
                    .setFooter(message.guild.name, message.guild.iconURL())
                return message.channel.send({embeds : [embed]})
            }
        }
        let newInfo = args.join(' ');
        if (!newInfo) return message.channel.send('Enter the new bio.');
        if (newInfo.length > 165) return message.channel.send(`Max \`160\` characters.`);
        let newsInfo = chunk(newInfo, 42).join('\n');
        db.set(`info_${user.id}`, newsInfo);

        let notesEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`You have changed your bio.`, message.author.displayAvatarURL())
            .setDescription(newsInfo)
            .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send({embeds : [notesEmbed]});
    

  }
})

client.on('messageCreate' , async message => {
  if(message.content.startsWith(prefix + 'withdraw')){
            let args = message.content.split(" ").slice(1)
            let user = message.member;
        let member2 = db.fetch(`bank_${user.id}`)
        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`bank_${user.id}`)
            let embed = new MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`You don't have any money in your bank.`)
            if (!money) return message.reply({embeds : [embed]})
            db.subtract(`bank_${user.id}`, money)
            db.add(`money_${user.id}`, money)
            let embed5 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`✅ You have withdrawn all your coins.`); 
            message.reply({embeds : [embed5]})

        } else {

            let embed2 = new MessageEmbed() 
                .setColor("RANDOM")
                .setDescription(`Specify an amount.`);

            if (!args[0]) {
                return message.reply({embeds : [embed2]})
            }
            let embed6 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`❌ Your Amount Is Not A Number!`)
            if(isNaN(args[0])) {
                return message.reply({embeds : [embed6]})
            }
            let embed3 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You can't withdraw negative money.`);

            if (message.content.includes('-')) {
                return message.reply({embeds : [embed3]})
            }
            let embed4 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You don't have enough money.`);

            if (member2 < args[0]) {
                return message.reply({embeds : [embed4]})
            }

            let embed5 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`✅ You have withdrawn ${args[0]} coins.`);

            message.reply({embeds : [embed5]})
            db.subtract(`bank_${user.id}`, args[0])
            db.add(`money_${user.id}`, args[0])
        
    }
  }
})

console.log(process.version)
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
require("./handlers")(client);
client.login(process.env.token);

