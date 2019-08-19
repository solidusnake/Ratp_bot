const Telegraf = require("telegraf");
const TelegrafInlineMenu = require("telegraf-inline-menu");
const config = require("./config");
const dataService = require("./dataService");
const bot = new Telegraf(config.botToken);
const fetch = require("node-fetch");

const menu = new TelegrafInlineMenu("Main Menu");
const validez = new TelegrafInlineMenu("Validez");

const { readFileSync } = require("fs");

require("es6-promise").polyfill();
require("isomorphic-fetch");

const helpMsg = `Command reference:
/start - Start bot (mandatory in groups)
/ligne - Choisir ligne de Metro Rer ou bus
/trafic - Voir le trafic en temps reels
/stop - arreter le bot
/about - A propos du bot
/help - Afficher la page d'aide'`;

menu.urlButton("RATP-Bot", "https://github.com/solidusnake/Ratp_bot");

const people = { Mark: {}, Paul: {} };
const food = ["bread", "cake", "bananas"];

/*menu transport*/
var selectedKey = "b";
menu.select("Main", ["Metro", "Bus", "RER", "Tram"], {
  setFunc: async (ctx, key) => {
    selectedKey = key;
    await ctx.answerCbQuery(`you selected ${key}`);
  },
  isSetFunc: (_ctx, key) => key === selectedKey
});
menu.submenu("Validez", selectedKey, validez, {});

/*menu transport*/

/*bouton validez*/

/*bouton validez*/

const foodSelectSubmenu = new TelegrafInlineMenu(foodSelectText)
  .toggle("Prefer Tee", "t", {
    setFunc: (ctx, choice) => {
      const person = ctx.match[1];
      people[person].tee = choice;
    },
    isSetFunc: ctx => {
      const person = ctx.match[1];
      return people[person].tee === true;
    }
  })
  .select("f", food, {
    setFunc: (ctx, key) => {
      const person = ctx.match[1];
      people[person].food = key;
    },
    isSetFunc: (ctx, key) => {
      const person = ctx.match[1];
      return people[person].food === key;
    }
  });

/*validez.selectSubmenu('p', () => Object.keys(people), foodSelectSubmenu, {
    textFunc: personButtonText,
    columns: 2
})*/

validez.question("Non Station", "add", {
  questionText: "Quel nom de station voulez vous choisir",

  setFunc: (_ctx, key) => {
    people[key] = {};
  }
});

/*fetch(url).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();

            }).then(function(stories) {
        stories.result.metros.forEach((item) => {
         //var tt = item.message;
            const fd =  item.message;
         //copie.push(item.message);
            })
    }); 
*/
let Rectangle = class Rectangle {
  constructor(g) {
    this.stories = g;
  }
  get area() {
    const url = "https://api-ratp.pierre-grimaud.fr/v4/traffic/metros";
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(stories) {
        stories.result.metros.forEach(g => {
          console.log(g);
        });
      });

    return this.calcArea();
  }

  calcArea() {
    return console.log(this.g + "fefefeffefefefef");
  }
};
const carré = new Rectangle();

console.log(carré.area);

let mainMenuToggle = false;
/*menu.toggle('toggle me', 'a', {
    setFunc: (_ctx, newVal) => {
        mainMenuToggle = newVal
        console.log(selectedKey + "fefefefeffeefffkofvklfkl")

    },
    isSetFunc: () => mainMenuToggle
})*/

function personButtonText(_ctx, key) {
  const entry = people[key];

  if (!entry || !entry.food) {
    return key;
  }
  return `${key} (${entry.food})`;
}
function foodSelectText(ctx) {
  const person = ctx.match[1];
  const hisChoice = people[person].food;
  if (!hisChoice) {
    return `${person} is still unsure what to eat.`;
  }

  return `${person} likes ${hisChoice} currently.`;
}

let isAndroid = true;
menu
  .submenu(
    "Trafic Menu",
    "trafic",
    new TelegrafInlineMenu("", {
      photo: () =>
        isAndroid
          ? "http://www.tac-productions.fr/wp-content/uploads/2017/02/Logo-RerA-carr%C3%A91-e1487256053310.png"
          : "https://telegram.org/img/SiteiOs.jpg"
    })
  )
  .setCommand("photo")
  .simpleButton("Just a button", "a", {
    doFunc: async ctx => ctx.reply("As am I!")
  })
  .select("img", ["iOS", "Android", "Windows mobile"], {
    isSetFunc: (_ctx, key) => (key === "Android" ? isAndroid : !isAndroid),
    setFunc: (_ctx, key) => {
      isAndroid = key === "Android";
    }
  });

menu.setCommand("start");

menu.simpleButton("click me", "c", {
  doFunc: async ctx => ctx.answerCbQuery("you clicked me!"),
  hide: () => mainMenuToggle
});

menu.simpleButton("nique ta mere", "f", {
  doFunc: async ctx => ctx.answerCbQuery("niker vous"),
  joinLastRow: true,
  hide: () => mainMenuToggle
});

menu.simpleButton("click me harder", "d", {
  doFunc: async ctx => ctx.answerCbQuery("you can do better!"),
  joinLastRow: true,
  hide: () => mainMenuToggle
});

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
    mainMenuButtonText: "menu principal"
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

/*fetch('https://api-ratp.pierre-grimaud.fr/v4/traffic')
    .then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function (stories) {
        stories.result.rers.forEach((item) => {
            //console.log(item);
            //telegram.editMessageText(chatId, messageId, inlineMessageId, text, [extra])


            //ctx.reply(item.line + "    " + item.message);
            //ctx.reply(item.line + "    " +  item.message);
            t = item.message
            console.log("fefefefefeffefefef'rgjnfejrgjnrjnfrjn" + t);
        })
    });*/

const inputErrMsg = `💥 BOOM... 🔩☠🔧🔨⚡️ `;

const aboutMsg = "https://github.com/solidusnake/Ratp_bot";
const ligne = "selectionner le mode de transports";
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

bot.command("broadcast", ctx => {
  if (ctx.from.id == config.adminChatId) {
    var words = ctx.message.text.split(" ");
    words.shift(); //remove first word (which ist "/broadcast")
    if (words.length == 0)
      //don't send empty message
      return;
    var broadcastMessage = words.join(" ");
    var userList = dataService.getUserList();
    console.log(
      "Sending broadcast message to",
      userList.length,
      "users:  ",
      broadcastMessage
    );
    userList.forEach(userId => {
      console.log(">", { id: userId }, broadcastMessage);
      ctx.telegram.sendMessage(userId, broadcastMessage);
    });
  }
});

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

bot.command(["incx", "decx", "getx", "setx", "resetx"], ctx => {
  logMsg(ctx);
  logOutMsg(ctx, incNMsg);
  ctx.reply(incNMsg);
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

bot.command("getall", ctx => {
  logMsg(ctx);
  counters = dataService.getAllCounters(ctx.chat.id);
  msg = "";
  Object.keys(counters).forEach(counterId => {
    msg += "[" + counterId + "] " + counters[counterId].value + "\n";
  });
  logOutMsg(ctx, msg);
  ctx.reply(msg);
});

bot.hears(getRegExp("lignes"), ctx => {
  //ligne de transport
  //logMsg(ctx);
  currentCommand = "lignes";
  ctx.reply("/metro /rer");

  bot.hears(getRegExp("metro"), ctx => {
    //metro
    fetch("https://api-ratp.pierre-grimaud.fr/v4/lines/metros")
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(stories) {
        console.log(stories);

        stories.result.metros.forEach(item => {
          //console.log(item);
          //telegram.editMessageText(chatId, messageId, inlineMessageId, text, [extra])

          setTimeout(() => {
            ctx.reply(item.name + " /" + item.code + "    " + item.directions);
            logOutMsg(ctx, 30);
          }, 50); //workaround to send this message definitely as second message

          //ctx.reply(item.line + "    " +  item.message);
        });
      });
  });
});

bot.hears(getRegExp("dec"), ctx => {
  logMsg(ctx);
});

bot.hears(getRegExp("reset"), ctx => {});

bot.hears(getRegExp("get"), ctx => {
  logMsg(ctx);
});

bot.hears(getRegExp("set"), ctx => {});

bot.startPolling();

module.exports = {};
