const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const canvacord = require("canvacord")
const { MessageAttachment } = require('discord.js')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', message => {
    if (message.content == 'rank') {
    const mentionMember = message.mentions.members.first() || message.author
    const img = mentionMember.displayAvatarURL({ format: 'png' })
    if (mentionMember.bot) {
        return message.channel.send("Bots dont have rank")
    }
    const rank = new canvacord.Rank()
    .setAvatar(img)
    .setUsername(mentionMember.username)
    .setDiscriminator(mentionMember.discriminator)
    .setProgressBar('#eee', 'COLOR')
    .setCurrentXP(5)
    .setRequiredXP(20)
    .setStatus(mentionMember.presence.status)
    rank.build()
    .then(buffer => {
        const image = new MessageAttachment(buffer, 'RankCard.png')
        message.channel.send(image)
    })
    }
})

client.login(config.token)