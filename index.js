var mineflayer = require('mineflayer');
var D = require('discord.js');
var client = new D.Client();
var config = require('./config.json');
var chalk = require('chalk');

var antiAfk = require('mineflayer-antiafk');
var armorManager = require('mineflayer-armor-manager');
var autoEat = require('mineflayer-auto-eat');
var jc = config.jc

// =========================
// VARIABLES
// =========================

let prefix = config.prefix;
let color = "#RANDOM";
let ip = config.ip;
let username = config.username;
let ver = config.version
var bot
if (config.password == "false") {
  bot = mineflayer.createBot({
    host: ip,
    username: username,
    version: ver
  })
} else {
let pass = config.password;

  bot = mineflayer.createBot({
    host: ip,
    username: username,
    password: pass,
    version: ver
  })
}

// =========================
// MINECRAFT ACTIVITY
// =========================

function lookAtNearestPlayer () {
  const playerFilter = (entity) => entity.type === 'player'
  const playerEntity = bot.nearestEntity(playerFilter)
  
  if (!playerEntity) return
  
  const pos = playerEntity.position.offset(0, playerEntity.height, 0)
  bot.lookAt(pos)
}

bot.loadPlugin(armorManager)
bot.loadPlugin(autoEat)
bot.loadPlugin(antiAfk)

bot.on('spawn', () => {
  bot.afk.setOptions({ fishing: false });
  bot.afk.start();
})

bot.on('spawn', () => {
  bot.afk.setOptions({ jumpWalk: true });
  bot.afk.start();
})

// =========================
// SET ACTIVITY BOT
// =========================

client.on('ready', activity => {
  client.user.setStatus(`online`)
  client.user.setActivity(
    `${ip} Servers Chat, | For Help Do  ${prefix}help `, {
      type: "WATCHING"
    }
  )
});

// =========================
// TERMINAL LOG
// =========================

client.on('ready', async () => {
  console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
  console.log(chalk.magenta(`Discord Bot on. Loggined as ${client.user.tag}`))
  console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
  console.log();
})
bot.on('login', async () => {
  console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
  console.log(chalk.magenta(`bot is on At ${ip}`))
  bot.chat(jc)
  console.log(chalk.yellow(`Bot just say "${jc}"`))
  console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
  console.log();
})

// =========================
// DISCORD BOT COMMANDS
// =========================

client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return
  let args = msg.content.split(" ").slice(1)
  args = msg.content.slice(prefix.length).split(/ +/);
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  command = args.shift().toLowerCase();

  if (command == "send") {
    const chat = args.join(" ")
    bot.chat(chat)
    const success = new D.MessageEmbed()
      .setDescription(`:white_check_mark: ${msg.author.tag} sent \`${chat}\``)
      .setColor(color)
    msg.channel.send(success)
  } else if (command == "forward") {
    bot.setControlState('forward', true)
    const MoForw = new D.MessageEmbed()
      .setDescription(`:white_check_mark: Im Moving forward To Stop Do -stop`)
      .setColor(color)
    msg.channel.send(MoForw)
  } else if (command == "backward") {
    bot.setControlState('back', true)
    const MoBackw = new D.MessageEmbed()
      .setDescription(`:white_check_mark: Im Moving backward To Stop Do -stop`)
      .setColor(color)
    msg.channel.send(MoBackw)
  } else if (command == "stop") {
    bot.clearControlStates()
    const MoStop = new D.MessageEmbed()
      .setDescription(`:white_check_mark: Stopped!`)
      .setColor(color)
    msg.channel.send(MoStop)
  } else if (command == "left") {
    bot.setControlState('left', true)
    const MoLeft = new D.MessageEmbed()
      .setDescription(`:white_check_mark: Im Moving left To Stop Do -stop`)
      .setColor(color)
    msg.channel.send(MoLeft)
  } else if (command == "right") {
    bot.setControlState('right', true)
    const MoRight = new D.MessageEmbed()
      .setDescription(`:white_check_mark: Im Moving Right To Stop Do -stop`)
      .setColor(color)
    msg.channel.send(MoRight)
  } else if (command == "help") {
    const help = new D.MessageEmbed()
      .setTitle(`Help`)
      .addField(` ${prefix}send (Chat) `, 'To Get The bot say what you want')
      .addField(` ${prefix}movement `, 'Look At Movement command')
      .setColor(color)
    msg.channel.send(help)
  } else if (command == "movement") {
    const movement = new D.MessageEmbed()
      .setTitle(`Movement Command`)
      .addField(` ${prefix}forward `, 'To Move Forward')
      .addField(` ${prefix}backward `, 'To Move Backward')
      .addField(` ${prefix}left `, 'To Move Left')
      .addField(` ${prefix}right `, 'To Move Right')
      .addField(` ${prefix}stop `, 'To Stop')
      .setColor(color)
    msg.channel.send(movement)
  } else if (command == "delmsg") {
    msg.channel.bulkDelete(100)
  }


})

bot.on("messagestr", message => {
  let channel = client.channels.cache.get(config.scid)
  if (!channel) return;
  channel.send(`From Server Chat >> ${message}`)
})

// =========================

client.login(config.Dtoken)
  .catch(error => {
    console.log(`cant login`);
  })
