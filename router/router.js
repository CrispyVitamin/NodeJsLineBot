const controller = require('../controller/user/user_controller');
var linebot = require('linebot');


var router = {
    route: function(command, event)
    {
        //check modify fund
        if(this.checkModifyFund(command, event))
                return;
        switch(command)
        {
            case '註冊':
                this.register(event);
                break;
            case '查詢餘額':
                this.querymoney(event);
                break;
            default:
                console.log("unknow command:" + command);
                break;
        }
    },
    querymoney: function(event){
        let id = event.source.userId;
        controller.queryFund(id, (result) =>{
            let msg = '';
            if(result === -1)
            {
                msg = '查無此使用者';
            }
            else
            {
                msg = '使用者餘額為： ' + result;
            }
    
            event.reply(msg).then(function (data) {
    
            }).catch(function (error) {
                // error
            });
        });
    }
    ,
    register: function(event){
        let id = event.source.userId;
        console.log("reg event for id:" + id);

        controller.newUser(id, (result) =>{
            let msg = '';
            if(result === 0)
            {
                msg = '使用者已經註冊';
            }
            else if(result === 1)
            {
                msg = '使用者註冊成功';
            }
            else if(result === 2)
            {
                msg = '使用者註冊失敗';
            }
    
            event.reply(msg).then(function (data) {
    
            }).catch(function (error) {
                // error
            });
        });
    },
    checkModifyFund: function(command, event){
        if(!command || command == '')
        {
            event.reply('餘額設定錯誤！').then(function (data) {
    
            }).catch(function (error) {
                // error
            });
            return false;
        }
        let result = command.split('變更餘額');
        if(result.length > 1)
        {
            let money = parseInt(result[1]);
            this.modifyFund(money, event);
            return true;
        }
        return false;
    },
    modifyFund: function(money, event){
        let id = event.source.userId;
        controller.modifyFund(id, money, (result) =>{
            let msg = '';
            if(result < 0)
            {
                msg = '餘額設定錯誤！';
            }
            else
            {
                msg = '新餘額為： ' + result;
            }

            event.reply(msg).then(function (data) {
    
            }).catch(function (error) {
                // error
            });
        });
    }
};


module.exports = router;