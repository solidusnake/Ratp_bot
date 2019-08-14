const Telegraf = require('telegraf');
const {
    Extra,
    Markup
} = require('telegraf') 

require('es6-promise').polyfill();
require('isomorphic-fetch');

const config = require('./config');
//var isomorphicFetch = require("isomorphic-fetch");
const dataService = require('./dataService');
const bot = new Telegraf(config.botToken);
const fetch = require('node-fetch');
const helpMsg = `Command reference:
/start - Start bot (mandatory in groups)
/ligne - Choisir ligne de Metro Rer ou bus
/trafic - Voir le trafic en temps reels
/stop - arreter le bot
/about - A propos du bot
/help - Afficher la page d'aide

Tip: You can also use e.g. '/inc2 5' to increase counter two by five counts.`;


//ligne -> metro -> rer -> tram -> bus
//

/*const helpMsg = `Command reference:
/start - Start bot (mandatory in groups)
/inc - Increment default counter
/inc1 - Increment counter 1
/incx - Increment counter x (replace x with any number)
/dec - Decrement counter
/decx - Decrement counter x
/reset - Reset counter back to 0
/resetx - Reset counter x back to 0
/set y - Set counter to y [/set y]
/setx y - Set counter x to y [/setx y]
/get - Show current counter
/getx - Show value of counter x
/getall - Show all counters
/stop - Attemt to stop bot
/about - Show information about the bot
/help - Show this help page

Tip: You can also use e.g. '/inc2 5' to increase counter two by five counts.`;*/

const inputErrMsg = `💥 BOOM... 🔩☠🔧🔨⚡️ `;

const incNMsg = `To use multiple counters, simply put the number of the counter you want to increase directly after the command like so:
/inc1 <- this will increment counter 1
/inc  <- this will increment the default counter (0)
This does also work with other commands like /dec1 /reset1 /set1 /get1`;

const aboutMsg = "https://github.com/solidusnake/Ratp_bot et";
const ligne = "selectionner le mode de transports";
const station = "selectionner la station";
const trafic = "ttttt";

function getRegExp(command) {
    return new RegExp("/" + command + "[0-9]*\\b");
}

//get username for group command handling
bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
    console.log("Initialized", botInfo.username);
});

dataService.loadUsers();

// expected output: 42

fetch('https://api-ratp.pierre-grimaud.fr/v4/traffic/metros')
    .then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function (stories) {
        console.log(stories)
        stories.result.metros.forEach((item) => {
            console.log(item.message);
        }) 
    });
    

    



function userString(ctx) {
    return JSON.stringify(ctx.from.id == ctx.chat.id ? ctx.from : {
        from: ctx.from,
        chat: ctx.chat
    });
}

function logMsg(ctx) {
    var from = userString(ctx);
    console.log('<', ctx.message.text, from)
}

function logOutMsg(ctx, text) {
    console.log('>', {
        id: ctx.chat.id
    }, text);
}

bot.command('broadcast', ctx => {
    if(ctx.from.id == config.adminChatId) {
        var words = ctx.message.text.split(' ');
        words.shift(); //remove first word (which ist "/broadcast")
        if(words.length == 0) //don't send empty message
            return;
        var broadcastMessage = words.join(' ');
        var userList = dataService.getUserList();
        console.log("Sending broadcast message to", userList.length, "users:  ", broadcastMessage);
        userList.forEach(userId => {
            console.log(">", {id: userId}, broadcastMessage);
            ctx.telegram.sendMessage(userId, broadcastMessage);
        });
    }
});

bot.command('start', ctx => {
    logMsg(ctx);
    dataService.registerUser(ctx);
    dataService.setCounter(ctx.chat.id, '0', 0);
    var m = "trafic et horaire ratp en temps reels";
    ctx.reply(m);
    logOutMsg(ctx, m);
    setTimeout(() => {
        //logOutMsg(ctx, 0)
    }, 50); //workaround to send this message definitely as second message
});

bot.command('stop', ctx => {
    logMsg(ctx);
    var m = "A bientot";
    logOutMsg(ctx, m);
    ctx.reply(m);
});

bot.command(['incx', 'decx', 'getx', 'setx', 'resetx'], ctx => {
    logMsg(ctx);
    logOutMsg(ctx, incNMsg);
    ctx.reply(incNMsg);
});
bot.command('help', ctx => {
    logMsg(ctx);
    logOutMsg(ctx, helpMsg);
    ctx.reply(helpMsg);

});





bot.command('trafic', ctx => {
    logMsg(ctx);
    logOutMsg(ctx, ligne);
    
    fetch('https://api-ratp.pierre-grimaud.fr/v4/traffic')
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function (stories) {
            console.log(stories)
            stories.result.rers.forEach((item) => {
                //console.log(item);
                //telegram.editMessageText(chatId, messageId, inlineMessageId, text, [extra])
 

                    ctx.reply(item.line +  "    " + item.message);
                //ctx.reply(item.line + "    " +  item.message);
            })
        });


});
https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/8/daumesnil/R

bot.command('about', ctx => {
    logMsg(ctx);
    logOutMsg(ctx, aboutMsg);
    ctx.reply(aboutMsg);
});

bot.command('getall', ctx => {
    logMsg(ctx);
    counters = dataService.getAllCounters(ctx.chat.id);
    msg = "";
    Object.keys(counters).forEach(counterId => {
        msg += '[' + counterId + '] ' + counters[counterId].value + "\n";
    });
    logOutMsg(ctx, msg);
    ctx.reply(msg);
});


bot.hears(getRegExp('lignes'), ctx => {
    //logMsg(ctx);
    currentCommand = 'lignes';
    fetch('https://api-ratp.pierre-grimaud.fr/v4/lines/metros')
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function (stories) {
            console.log(stories)
            stories.result.metros.forEach((item) => {
                //console.log(item);
                //telegram.editMessageText(chatId, messageId, inlineMessageId, text, [extra])
                
                setTimeout(() => {
                    ctx.reply(item.name + " /" +item.code + "    " + item.directions);
                    logOutMsg(ctx, 30)
                }, 50); //workaround to send this message definitely as second message

                //ctx.reply(item.line + "    " +  item.message);
            })
        });
});

bot.hears(getRegExp('dec'), ctx => {
    logMsg(ctx);

});

bot.hears(getRegExp('reset'), ctx => {

});

bot.hears(getRegExp('get'), ctx => {
    logMsg(ctx);

});

bot.hears(getRegExp('set'), ctx => {

});


bot.startPolling();


module.exports = {

}
