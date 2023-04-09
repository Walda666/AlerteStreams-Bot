const config = require('../config.json')
const fetch = require("node-fetch")
let OnStream = false
module.exports = {
    async run(message, args, client) {
    message.delete()
	
    // Données API Twitch
    const userId = 0000000000
    const token = "XXXXXXXXXXXXXXX"
    const clientId = "XXXXXXXXXXXXX"
    
    const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`
    const headersA = {
        'Authorization': `Bearer ${token}`,
        'Client-ID': clientId
    }
    
    function cb(json) {
        if(json.data.length && !OnStream) {
            let server = client.guilds.cache.get(config.server)
            let channel = server.channels.cache.get(config.channelAnnonce)
            channel.send(`XXXXX est en stream ! <@&${config["rolenotif"]}>\n\nhttps://www.twitch.tv/XXXXX`)
           OnStream = true
        }
        if(!json.data.length && OnStream) {
            OnStream = false
         }
    }
    
    function fetchTwitchApi(url, headers, cb) {
        fetch(url, {
            headers: headers
        }).then((response) => {
            return response.json()
        }).then((json) => cb(json))
    }

    fetchTwitchApi(url, headersA, cb)


  
    setInterval(() => {
        fetchTwitchApi(url, headersA, cb)
    }, 1000*40);

    

        


},
name: 'annonce'
}