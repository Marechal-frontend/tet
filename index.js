const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot iniciado, com ${client.users.size} usuarios, em ${client.channels.size} canais de ${client.guilds.size} servidores.`);
  client.user.setActivity(`com ${client.users.size} pessoas`);
});

client.on("guildCreate", guild => {
  console.log(`Entrei em uma nova guild: ${guild.name} (id: ${guild.id}). Este servidor possui ${guild.memberCount} membros!`);
  client.user.setActivity(`em ${client.guilds.size} servidores`);
});

client.on("guildDelete", guild => {
  console.log(`Eu fui removido de: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`em ${client.guilds.size} servidores`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "ping") {
    const m = await message.channel.send("Pera lá, amigão...");
    m.edit(`:ping_pong: ${m.createdTimestamp - message.createdTimestamp}ms. Latencia: ${Math.round(client.ping)}ms`);
  }

  if(command === "help") {
    const embed = new Discord.RichEmbed()
  .setTitle("Comandos")

  .setColor(0x00AE86)
 
  .setTimestamp()
  .addField("Ajuda",
    "**Kiss**: Dá um beijo na pessoa mencionada\n\n**Hug**: Abraça a pessoa mencionada\n\n**Say**: Diga X\n\n**Avatar**: Mostra a foto de perfil da pessoa mencionada\n\n")

  message.channel.send({embed});
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "avatar") {
    let user = message.mentions.users.first() || message.author;

    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}`)
    .setImage(user.displayAvatarURL)
    .setColor('RANDOM')
    message.channel.send(embed)
  }

  if(command === "kick") {
    if(!message.member.roles.some(r=>["Administrador", "Moderador",  "SysOp", "Mare"].includes(r.name)) )
      return message.reply("Você não tem permissão para isso!");
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Por favor, mencione um usuario valido **deste servidor**.");
    if(!member.kickable) 
      return message.reply("Eu não posso kickar este usuario. Ele tem uma tag acima da minha... Será que deveria bani-lo?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Razão não identificada.";
    
    await member.kick(reason)
      .catch(error => message.reply(`Desculpe, ${message.author}. Eu não posso bani-lo. Motivo: ${error}`));
    message.channel.send(`${member.user.tag} foi kickado por ${message.author.tag}. Motivo: ${reason}`);

  }
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrador", "Moderador", "SysOp", "Mare"].includes(r.name)) )
      return message.reply("Desculpe, você não tem permissão para usar isto.");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Por favor, mencione um usuario valido **deste servidor**.");
    if(!member.bannable) 
      return message.reply("Eu não posso banir este usuario. Ele tem uma tag acima da minha... Será que deveria bani-lo?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Razão não identificada.";
    
    await member.ban(reason)
      .catch(error => message.reply(`Desculpe, ${message.author}. Não foi possivel banir este usuario. Motivo: ${error}`));
    message.channel.send(`${member.user.tag} foi banido por ${message.author.tag} motivo: ${reason}`);
  }
  if(command === "kiss") {
    let hug = [
        "https://tenor.com/view/anime-kiss-gif-5095865",
        "https://tenor.com/view/kiss-muah-anime-nyaruko-crawling-with-love-gif-3560801",
        "https://tenor.com/view/anime-ano-natsu-de-matteru-gif-9670722",
        "https://tenor.com/view/anime-kiss-gif-4829336",
        "https://tenor.com/view/kiss-anime-smooch-gif-7572438",
        "https://tenor.com/view/golden-time-anime-kiss-couple-lovers-gif-6155670",
        "https://tenor.com/view/aho-girl-kiss-anime-gif-9903014",
        "https://tenor.com/view/kiss-anime-love-gif-4958649",
        "https://tenor.com/view/riniredrum-naruto-sakura-haruno-sasuke-gif-10879692",
        "https://tenor.com/view/anww-hug-kiss-anime-cartoon-gif-4874618",
        "https://tenor.com/view/golden-time-anime-kiss-gif-6155657",
        "https://tenor.com/view/anime-kiss-romance-gif-5649376",
        "https://tenor.com/view/highschooldxd-asia-issei-kiss-tiptoe-gif-6206552",
        "https://tenor.com/view/noragami-yato-kissing-kiss-kisses-gif-5198866",
        "https://tenor.com/view/kiss-kissing-anime-gif-4883557",
        "https://tenor.com/view/anime-tall-guy-punch-kiss-couple-gif-4950748",
        "https://tenor.com/view/lewd-smooch-kiss-anime-kisses-gif-7386341",
        "https://tenor.com/view/kiss-lipbite-gif-7324668",
        "https://tenor.com/view/cute-love-anime-cuddle-kiss-gif-4998184",
        "https://tenor.com/view/make-out-french-kiss-ratel-hitomi-eroza-gif-11234907",
        "https://tenor.com/view/toloveru-unexpected-surprise-kiss-gif-5372258",
        "https://tenor.com/view/kiss-anime-gif-8811697",
        "https://tenor.com/view/kanna-dragonmaid-dragon-maid-misskobayashi-gif-8053679",
        "https://tenor.com/view/kiss-anime-couple-sword-art-online-kirito-and-asuna-gif-5608449",
        "https://tenor.com/view/diane-kiss-king-nanatsu-no-taizai-anime-gif-11794176",
        "https://tenor.com/view/anime-kiss-gif-4797281",
        "https://tenor.com/view/kiss-anime-couple-gif-7549151",
        "https://tenor.com/view/anime-blow-akiss-love-you-guys-be-happy-heart-gif-11539049",
        "https://tenor.com/view/pokemon-pikachu-kiss-kissing-sweet-gif-3556102",
        "https://tenor.com/view/toradora-anime-kiss-gif-5291693",
        "https://tenor.com/view/heart-anime-love-gif-5180037"
    ]
    let hugresult = Math.floor((Math.random() * hug.length));
    if (!args[0]) {
        const ghembed = new Discord.RichEmbed()
            .setColor(0xFF9BD2)
            .setTitle(`${message.author.username}, Você precisa mencionar uma pessoa para dar um beijo.`)
            .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
        message.channel.send({
            embed: ghembed
        })
        return;
    }
    if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
      const hembed = new Discord.RichEmbed()
          .setColor(0xFF9BD2)
          .setTitle(`${message.author.username} deu um beijo em ${message.mentions.members.first().user.username}!`)
          .setImage(hug[hugresult])
      message.channel.send({
          embed: hembed
      })
      return;
  }
  const ghembed = new Discord.RichEmbed()
      .setColor(0xFF9BD2)
      .setTitle(`${message.author.username}, você não pode dar um beijo em sí mesmo.`)
      .setImage('http://45.media.tumblr.com/dfd8465257cd6da12eabdde0bcb1fe00/tumblr_o33i85HGlE1v90u75o1_540.gif')
  message.channel.send({
      embed: ghembed
  })
}

  if(command === "hug") {
    let hug = [
        "https://data.whicdn.com/images/221692186/original.gif",
        "http://mrwgifs.com/wp-content/uploads/2013/04/Ouran-High-School-Host-Club-Love-Hug-Gif.gif",
        "http://images6.fanpop.com/image/photos/33100000/Kyoya-and-Tamaki-ouran-high-school-host-club-33132917-500-375.gif",
        "http://31.media.tumblr.com/4d6525e7b5e546cde555bf2453563335/tumblr_mskyp8XJcb1r40gm7o1_1280.gif",
        "https://i.pinimg.com/originals/34/dc/98/34dc98f17fd5cf558611f14ff9a0c1c9.gif",
        "https://i.imgur.com/ntqYLGl.gif",
        "https://i.imgur.com/BPLqSJC.gif",
        "https://i.imgur.com/nrdYNtL.gif",
        "https://i.imgur.com/v47M1S4",
        "https://78.media.tumblr.com/6bef64140dfefe6fe86089c6eb11fb9b/tumblr_ohhnjyDJll1vm2xpgo1_500.gif",
        "https://78.media.tumblr.com/806c23dbcf9bde033e708c8679c63975/tumblr_inline_ohhtig3BpF1rz9r19_540.gif",
        "https://i.pinimg.com/originals/0f/48/1b/0f481bfc59229ce8127f2aba52bb8f4a.gif",
        "https://pa1.narvii.com/6276/4461c2a865973bddcc5f4e591a165e09275c7a2c_hq.gif",
        "https://78.media.tumblr.com/7e29c1e560c527de00a9f57bb7d941c3/tumblr_inline_ohi8745BbI1u9qbij_540.gif",
        "https://data.whicdn.com/images/271163043/original.gif",
        "https://78.media.tumblr.com/d00aba2e25ac11a11d9c5a770275dfc8/tumblr_orpdyc83FN1rtwid9o1_500.gif",
        "http://0.media.dorkly.cvcdn.com/33/43/cac85de1cfd2bc4e7bec36631b260156.gif",
        "https://i.pinimg.com/originals/22/8a/c9/228ac960b7c24ffb87374857fa6a0920.gif",
        "https://pa1.narvii.com/6333/8c254b88d099c03be84769075ecac875c5dbb4bb_hq.gif",
        "https://pa1.narvii.com/6449/c5383d0a548987d69aac06e8dc9b270219159b3f_hq.gif",
        "https://media1.tenor.com/images/100c453c2f411189b40e6931ff65a88b/tenor.gif?itemid=7210521",
        "https://i.pinimg.com/originals/e5/0e/c8/e50ec889ef64432e5d4648370014d272.gif",
        "https://78.media.tumblr.com/94f62f2fbca608f70a48e6c04c2dc27c/tumblr_orotkrEC4t1vbbkedo2_540.gif",
        "http://i0.kym-cdn.com/photos/images/original/001/266/481/075.gif",
        "https://data.whicdn.com/images/310192271/original.gif",
        "https://78.media.tumblr.com/064596e2fb0101675b89d79ac41141e0/tumblr_p8g2jmxCLD1qc9mvbo1_540.gif",
    ]
    let hugresult = Math.floor((Math.random() * hug.length));
    if (!args[0]) {
        const ghembed = new Discord.RichEmbed()
            .setColor(0xFFF9AA)
            .setTitle(`${message.author.username}, Você precisa mencionar uma pessoa para dar um abraço.`)
            .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
        message.channel.send({
            embed: ghembed
        })
        return;
    }
    if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
        const hembed = new Discord.RichEmbed()
            .setColor(0xFFF9AA)
            .setTitle(`${message.author.username} deu um abraço em ${message.mentions.members.first().user.username}!`)
            .setImage(hug[hugresult])
        message.channel.send({
            embed: hembed
        })
        return;
    }
    const ghembed = new Discord.RichEmbed()
        .setColor(0xFFF9AA)
        .setTitle(`${message.author.username}, você não pode dar um abraço em sí mesmo.`)
        .setImage('http://45.media.tumblr.com/dfd8465257cd6da12eabdde0bcb1fe00/tumblr_o33i85HGlE1v90u75o1_540.gif')
    message.channel.send({
        embed: ghembed
    })
}

  if(command === "clear") {    
    if(!message.member.roles.some(r=>["Administrador", "Moderador", "SysOp", "Mare"].includes(r.name)) )
        return message.reply("Desculpe, você não tem permissão para usar isto.");
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Digite um numero de 2 à 100 mensagens.");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Impossível deletar mensagens, motivo: ${error}`));
  }
});

client.login(config.token);
