var linebot = require('linebot');
var router = require('../router/router');



var bot = linebot({
  channelId: process.env.LINE_channelId,
  channelSecret: process.env.LINE_channelSecret,
  channelAccessToken: process.env.LINE_channelAccessToken
});

function start() {
    
    bot.on('message', function (event) {
        let id = event.source.userId;
        console.log("id:" + id);
        router.route(event.message.text, event);
    });

    bot.listen('/linewebhook', 3000);

    console.log('line bot started!');
}

exports.start = start;