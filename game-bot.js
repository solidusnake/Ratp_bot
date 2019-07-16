

const config = require('./config');
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')



const gameUrl = 'https://your-game.tld'

const markup = Extra.markup(
  Markup.inlineKeyboard([
    Markup.gameButton('🎮 Play now!'),
    Markup.urlButton('Telegraf help', 'http://telegraf.js.org')
  ])
)
const bot = new Telegraf(config.botToken);
//const bot = new Telegraf(process.env.BOT_TOKEN)