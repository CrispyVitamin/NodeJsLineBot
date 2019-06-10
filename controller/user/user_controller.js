var mongoose = require('mongoose');
var User = mongoose.model('User');

var controller = {
    hasUser : function(userID, callback){
        User.find( { 'userid' : userID }).then(function(docs){
            let result = false;
            let userdoc = null;
            if(docs.length){
                result = true;
                userdoc = docs[0];
            }
            else
            {
                result = false;
            }
            callback(result, userdoc);
        });
    },
    newUser : function(userID, callback) {

        this.hasUser(userID, (result) => {
            if(result === true)
            {
                console.log("user already exists: " + userID);
                callback(0);
            }
            else
            {
                var user = new User();
                user.userid = userID;
                user.state = 0;
                user.money = 0;
                user.lastlogin = new Date();
                user.save().then(function(){
                    console.log("user created: " + userID);
                    callback(1);
                }).catch(
                    function(error){
                        console.log("user created error");
                        callback(2);
                    }
                );
            }
        });
    },
    queryFund : function(userID, callback) {

        User.findOne( { 'userid' : userID}).then(function(doc) {
            if(!doc)
            {
                callback(-1);
            }
            else
            {
                let userObj = doc.toObject();
                callback(userObj.money);
            }
        });
    },
    modifyFund : function(userID, money, callback) {

        User.updateOne( { 'userid' : userID}, { 'money': money }, function(err, doc){
            if(err)
            {
                callback(-1);
            }
            else
            {
                callback(money);
            }
        });
    },
};


module.exports = controller;