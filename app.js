require('dotenv').config()

//var server = require('./server');

//server.start();

//console.log("LINE_channelId: " + process.env.LINE_channelId);

var mongo = require('./mongodb/mongo');



mongo.start( );

require('./model/user');


var linebot = require('./linebot/linebot');
linebot.start()