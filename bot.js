const Telegraf = require("telegraf");
const TelegrafInlineMenu = require("telegraf-inline-menu");
const config = require("./config");
const dataService = require("./dataService");
const bot = new Telegraf(config.botToken);
const fetch = require("node-fetch");
const { readFileSync } = require("fs");

require("es6-promise").polyfill();
require("isomorphic-fetch");

class Schedules {
  constructor(type, line, station) {
    /* url server */
    this.url = "https://api-ratp.pierre-grimaud.fr/v4/schedules/";
    /* type metros or rers */
    this.type = type;
    /* line */
    this.line = line;
    /* station example chatelet */
    this.station = station;

    this.stories;
    this.tab = [];
    this.tab1 = [];
    this.trans;
  }
  requete() {
    const url = this.url;
    const type = this.type;
    const line = this.line;
    const station = this.station;

    fetch(url + type + line + station)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(stories => {
        this.trans = stories.result.schedules;
        //this.trans = stories.result.rers;
        this.trans.forEach(item => {
          //this.trans;
          //this.type = result.metros
          this.item = item;
          //this.tab.push(this.item.name);
          //console.log(this.item.destination);
        });
        this.affiche();
        //this.destination();
      });
  }
  affiche() {
    //console.log(this.stories);
    //console.log(this.tab);
    this.message(), this.destination();
  }
  message() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab.push(this.item.message);
    });
    console.log(this.tab);
  }
  destination() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab1.push(this.item.destination);
      //console.log(this.item.destination);
    });
    console.log(this.tab1);
  }
}
class Stations {
  constructor(type, line, way) {
    /* url server */
    this.url = "https://api-ratp.pierre-grimaud.fr/v4/stations/";
    /* type metros or rers */
    this.type = type;
    /* line */
    this.line = line;
    /* way */
    this.way = way;

    this.stories;
    this.tab = [];
    this.tab1 = [];
    this.trans;
    var montest = ["g"];
  }
  requete() {
    const url = this.url;
    const type = this.type;
    const line = this.line;
    const way = this.way;

    fetch(url + type + line + way)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(stories => {
        this.trans = stories.result.stations;
        //this.trans = stories.result.rers;
        this.trans.forEach(item => {
          //this.trans;
          //this.type = result.metros
          this.item = item;
          //this.tab.push(this.item.message);
          //console.log(this.item.name);
        });
        this.affiche();
        //this.destination();
      });
  }
  affiche() {
    //console.log(this.stories);
    //console.log(this.tab);
    this.name(), this.slug();
  }
  name() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab.push(this.item.name);
    });
    return this.tab;
  }
  slug() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab1.push(this.item.slug);
      //console.log(this.item.destination);
    });
    console.log(this.tab1);
  }
}
class Lines {
  constructor() {
    /* url server */
    this.url = "https://api-ratp.pierre-grimaud.fr/v4/lines/";
    /* type metros or rers */
    //this.type = type;
    this.stories;
    this.tab = [];
    this.tab1 = [];
    this.trans;
  }
  requete() {
    const url = this.url;
    //const type = this.type;

    fetch(url)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(stories => {
        this.trans = stories.result.metros;
        //this.trans = stories.result.rers;
        this.trans.forEach(item => {
          //this.trans;
          //this.type = result.metros
          this.item = item;
          //this.tab.push(this.item.message);
          //console.log(this.item.name);
        });
        this.affiche();
        //this.destination();
      });
  }
  affiche() {
    //console.log(this.stories);
    //console.log(this.tab);
    this.name(), this.code();
  }
  name() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab.push(this.item.name);
    });
    console.log(this.tab);
  }
  code() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab1.push(this.item.code);
      //console.log(this.item.destination);
    });
    console.log(this.tab1);
  }
}
const helpMsg = `Command reference:
/start - Start bot (mandatory in groups)
/ligne - Choisir ligne de Metro Rer ou bus
/trafic - Voir le trafic en temps reels
/stop - arreter le bot
/about - A propos du bot
/help - Afficher la page d'aide'`;

var selectedKey = "b";
var lastindex = "2";

const menu = new TelegrafInlineMenu("Main Menu");

menu.urlButton("RATP-Bot", "https://github.com/solidusnake/Ratp_bot");

const lines = new Lines();
lines.requete();

//select lines
menu.select("ligne", lines.tab1, {
  setFunc: async (ctx, key) => {
    selectedKey = key;
    //var stations = new Stations("metros/", selectedKey, "?way=A");
    //stations.requete();
    //console.log(stations.tab);
    lastindex = key;
    console.log(lastindex, "ligne", selectedKey);
    await ctx.answerCbQuery(`you selected ${key}`);
  },
  isSetFunc: (_ctx, key) => key === selectedKey
});

const validez = new TelegrafInlineMenu("Validez");

console.log("stations");

//select stations
var stations;
validez.select("stations", "stations.tab1", {
  stations = new Stations("metros/", "2", "?way=A")
  
  ,setFunc: async (ctx, key) => {
    stations.requete();
    console.log("valider", selectedKey);
    selectedKey = key;
    await ctx.answerCbQuery(`you selected ${key}`);
  },
  isSetFunc: (_ctx, key) => key === selectedKey
});

menu.submenu("Validez", selectedKey, validez, {});
const horaire = new TelegrafInlineMenu("Ok");

validez.submenu("OK", selectedKey, horaire, {});
menu.setCommand("start");

bot.use((ctx, next) => {
  if (ctx.callbackQuery) {
    console.log(
      "another callbackQuery happened",
      ctx.callbackQuery.data.length,
      ctx.callbackQuery.data
    );
  }

  return next();
});

bot.use(
  menu.init({
    backButtonText: "back…",
    mainMenuButtonText: "Menu principal"
  })
);

bot.catch(error => {
  console.log(
    "telegraf error",
    error.response,
    error.parameters,
    error.on || error
  );
});

bot.startPolling();

const inputErrMsg = `💥 BOOM... 🔩☠🔧🔨⚡️ `;

const aboutMsg = "https://github.com/solidusnake/Ratp_bot";
const lignen = "selectionner le mode de transports";
const station = "selectionner la station";

function getRegExp(command) {
  return new RegExp("/" + command + "[0-9]*\\b");
}

//get username for group command handling
bot.telegram.getMe().then(botInfo => {
  bot.options.username = botInfo.username;
  console.log("Initialized", botInfo.username);
});

dataService.loadUsers();

// expected output: 42

function userString(ctx) {
  return JSON.stringify(
    ctx.from.id == ctx.chat.id
      ? ctx.from
      : {
          from: ctx.from,
          chat: ctx.chat
        }
  );
}

function logMsg(ctx) {
  var from = userString(ctx);
  console.log("<", ctx.message.text, from);
}

function logOutMsg(ctx, text) {
  console.log(
    ">",
    {
      id: ctx.chat.id
    },
    text
  );
}
bot.command("start", ctx => {
  logMsg(ctx);
  dataService.registerUser(ctx);
  dataService.setCounter(ctx.chat.id, "0", 0);
  var m = "trafic et horaire ratp en temps reels";
  ctx.reply(m);
  logOutMsg(ctx, m);
  setTimeout(() => {
    //logOutMsg(ctx, 0)
  }, 50); //workaround to send this message definitely as second message
});

bot.command("stop", ctx => {
  logMsg(ctx);
  var m = "A bientot";
  logOutMsg(ctx, m);
  ctx.reply(m);
});

bot.command("help", ctx => {
  logMsg(ctx);
  logOutMsg(ctx, helpMsg);
  ctx.reply(helpMsg);
});

bot.command("about", ctx => {
  logMsg(ctx);
  logOutMsg(ctx, aboutMsg);
  ctx.reply(aboutMsg);
});

bot.hears(getRegExp("get"), ctx => {
  logMsg(ctx);
});

module.exports = {};
