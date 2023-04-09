const Discord = require("discord.js");
const configA = require('./config.json');

const { Client, Intents } = require('discord.js');
const { config } = require("process");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS] });
fs = require('fs')

client.login(configA.token);
client.commands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
    if(err) throw err
    files.forEach(file => {
        if(!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on('message', message => {
    if(message.type !== 'DEFAULT' || message.author.bot) return
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if(commandName.startsWith("||!select||")) {
        const command = client.commands.get('select')
        command.run(message, args, client)
    }
    if(!commandName.startsWith(configA.prefix)) return
    const command = client.commands.get(commandName.slice(configA.prefix.length))
    if(!command) return
    command.run(message, args, client)
});



  client.on('interactionCreate', async(interraction) => {
    if(interraction.isButton) {
        interraction.deferUpdate()
        let member = interraction.channel.guild.members.cache.get(interraction.user.id);
        let role = await interraction.channel.guild.roles.cache.find(r => r.id === configA.rolenotif);
        if(interraction.customId == "addNotif") {
            let rolesPerson = member.roles
             rolesPerson.add(role)
        }
        if(interraction.customId == "removeNotif") {
            let rolesPerson = member.roles
            rolesPerson.remove(role)
        }
    }
  })




client.once('ready',  () => {
    console.log("Good !");
    client.user.setStatus('invisible')
});