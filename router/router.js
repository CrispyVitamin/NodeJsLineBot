const controller = require('../controller/user/user_controller');
const bot_controller = require('../controller/bot/bot_controller');
const route_const = require('./router_constant');
var linebot = require('linebot');


var router = {
    route: function(command, event) {
        //check modify fund
        if(bot_controller.checkModifyFund(command, event))
                return;
        switch(command) {
            case route_const.ROUTE_REGISTER:
                bot_controller.register(event);
                break;
            case route_const.ROUTE_QUERYMONEY:
                bot_controller.querymoney(event);
                break;
            default:
                console.log("unknow command:" + command);
                break;
        }
    }
};


module.exports = router;