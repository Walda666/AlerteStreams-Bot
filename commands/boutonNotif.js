const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const config = require('../config.json')
module.exports = {
    async run(message, args, client) {
    message.delete()
	const button = new MessageButton()
	.setCustomId('addNotif')
	.setLabel('✓')
	.setStyle('SUCCESS')

    const button2 = new MessageButton()
	.setCustomId('removeNotif')
	.setLabel('✖')
	.setStyle('DANGER')


    let embedopen = new MessageEmbed()
	.setDescription(`Selectionnez un bouton pour activer ou désactiver les notifications lorsqu'iNitrow lance un stream !\n\n✅ Activer les notifications\n❌ Désactiver les notifications`)
	.setTitle("Notifs streams")
	.setColor("AQUA")

    

    const row = new MessageActionRow()
			.addComponents(button)
            .addComponents(button2)

        message.channel.send({embeds: [embedopen], components: [row]})

        


},
name: 't'
}