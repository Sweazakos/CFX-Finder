const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, MessageAttachment  } = require('discord.js');
const bot = new Discord.Client()
const fetch = require("node-fetch")
const https = require("https")

bot.on('ready', () => {
    console.info(`BenderCFX |${bot.user.tag}>b`);
});

bot.login("ODYwNjM4NDIxMDA0MzIwNzg4.YN-J_Q.rRBOhW-BJkZYRxRMx6a7PZ1uqdU")

bot.on('message', msg => {
    
    if(msg.content.startsWith(">bfind")){

        const args3 = msg.content.slice(">bfind".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-live.fivem.net/api/servers/single/"+code
        https.get(urlfivem, function(res) {
            if(res.statusCode == 404){

                const mensaje = new Discord.MessageEmbed()
                .setColor("#c73e10")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Invalid Code```")
                .setFooter("BaderCFX |")
                msg.channel.send(mensaje);

            }else{
                fetch(urlfivem)
                .then(res => res.json())
                .then((out) => {
                    
                    if(out["Data"]["connectEndPoints"][0].startsWith("http")){
        
                        var split =  `${out["Data"]["connectEndPoints"][0]}`.split(":")
                        var urlip = "http://ip-api.com/json/"+split[0]
                        fetch(urlip)
                        .then(res => res.json())
                        .then((out2) => {
                        
                        if(out["icon"]){
                            var icon = out2["icon"]
                            let file = new Buffer.from(icon, 'base64')
                            const att = new Discord.MessageAttachment(file, "graph.png")
                            const mensaje = new Discord.MessageEmbed()

                            .setColor("#c73e10")
                            .setAuthor(msg.author.tag, msg.author.avatarURL())
                            .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                            .addField("Server Details", `IP: \`${split[0]}\`\n Country: \`${out2["country"]}\`\n City: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: \`${out2["org"]}\`\n Zip Code: \`${out2["zip"]}\`\n Timezone: \`${out2["timezone"]}\`\n`)
                            .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                            .setFooter("BenderCFX |")
                            .setThumbnail("attachment://graph.png")
                            .attachFiles(att)

                            msg.channel.send(mensaje);
                        }else{
                            const mensaje = new Discord.MessageEmbed()
                            .setColor("#c73e10")
                            .setAuthor(msg.author.tag, msg.author.avatarURL())
                            .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                            .addField("Server Details", `IP: \`${split[0]}\`\n Country: \`${out2["country"]}\`\n City: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: \`${out2["org"]}\`\n Zip Code: \`${out2["zip"]}\`\n Timezone: \`${out2["timezone"]}\`\n`)
                            .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                            .setFooter("BenderCFX |")
                            msg.channel.send(mensaje);
                        }
                        
                    
                        })
        
                    }else{
                        const mensaje = new Discord.MessageEmbed()
                        .setColor("#c73e10")
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setDescription("```\n Cannot find server details...```")
                        .addField("Cfx Url", `\`${out["Data"]["connectEndPoints"][0]}\``)
                        .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                        .setFooter("BenderCFX |")
                        msg.channel.send(mensaje);
                    }
                })
            }
        
        })
        

    }else if(msg.content.startsWith("ip")){
        const args3 = msg.content.slice(">bip".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-live.fivem.net/api/servers/single/"+code
        https.get(urlfivem, function(res) {
            if(res.statusCode == 404){
                const mensaje = new Discord.MessageEmbed()
                .setColor("#c73e10")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Invalid Code```")
                .setFooter("BenderCFX |")
                msg.channel.send(mensaje);
            }else{
                fetch(urlfivem)
                .then(res => res.json())
                .then((out) => {
                    const mensaje = new Discord.MessageEmbed()
                    .setAuthor(msg.author.tag, msg.author.avatarURL())
                    .setColor("#c73e10")
                    .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                    .setFooter("BenderCFX |")
                    msg.channel.send(mensaje);
                })
            }
            
        })
        
    }else if(msg.content.startsWith("<bhelp")){

        const mensaje = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setColor("#c73e10")
        .addField("\<:info:820801226216177684> CFX Server Info", "`>bfind [cfx code]`")
        .addField("\<:ip:820801530172801035> Get Server IP", "`>bip [cfx code]`")
        .addField("\<:logo:820801824050905129> Get Server Logo", "`>blogo [cfx code]`")
        .addField("\<:tags:820801679208349737> Get Server Tags", "`>btags [cfx code]`")
        .setFooter("BenderCFX |")
        msg.channel.send(mensaje);
    
    }else if(msg.content.startsWith(">blogo")){

        const args3 = msg.content.slice(">blogo".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-live.fivem.net/api/servers/single/"+code
        fetch(urlfivem)
                .then(res => res.json())
                .then((out) => {
                    
                        if(out["Data"]["connectEndPoints"][0].startsWith("http")){
                            var urlip = `http://${out["Data"]["connectEndPoints"][0]}/info.json`
                                                            
                                fetch(urlip)
                                .then(res => res.json())
                                .then((out2) => {
                                    
                                    var icon = out2["icon"]
                                    let file = new Buffer.from(icon, 'base64')
                                    const att = new Discord.MessageAttachment(file, "icon.png")
                                    const mensaje = new Discord.MessageEmbed()
        
                                    .setColor("#c73e10")
                                    .setAuthor(msg.author.tag, msg.author.avatarURL())
                                    //.setDescription("Image from server")
                                    .setImage("attachment://icon.png")
                                    //.setThumbnail("attachment://graph.png")
                                    .attachFiles(att)
        
                                    msg.channel.send(mensaje);
                                })
    
                        }
                    
                })
    }else if(msg.content.startsWith(">btags")){

        const args3 = msg.content.slice(">blogo".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-live.fivem.net/api/servers/single/"+code
        fetch(urlfivem)
                .then(res => res.json())
                .then((out) => {
                    if(out["Data"]["vars"]["tags"] && out["Data"]["hostname"]){

                        var tags = out["Data"]["vars"]["tags"]
                        var name = out["Data"]["hostname"]

                        const mensaje = new Discord.MessageEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setColor("#c73e10")
                        .addField("Server Name", `\`${name}\``.substring(0, 390))
                        .addField("Server Tags", `\`${tags}\``.substring(0, 1024))
                        .setFooter("BenderCFX |")
                        msg.channel.send(mensaje);

                    }else{
                        const mensaje = new Discord.MessageEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setColor("#c73e10")
                        .setDescription("```\n Cannot find server tags```")
                        msg.channel.send(mensaje);
                    }

                })
    }
    

})

