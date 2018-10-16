const Discord = require("discord.js");
const client = new Discord.Client();
const sql = require("sqlite");
sql.open("./score.db");

const prefix = "s!";
client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type !== "text") return;

  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
  }

  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.2 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`Você passou para o level **${curLevel}**!\n https://i.gifer.com/Iqte.gif`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });

  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "level")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Você está no level 0!");
      message.reply(`Você está no level ${row.level}!`);
    });
  } else

  if (message.content.startsWith(prefix + "points")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("você não possui pontos!");
      message.reply(`atualmente você possui ${row.points} pontos!`);
    });
  }
});
  
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Level source on!`);
    console.log(`Logged from id ${client.user.id}`);
    console.log(`Bot iniciado, com ${client.users.size} usuarios, em ${client.channels.size} canais de ${client.guilds.size} servidores.`);
  });
  
