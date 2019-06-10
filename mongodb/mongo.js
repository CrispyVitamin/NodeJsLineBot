const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const DB_URL = process.env.DB_HOST;




function start(callback)
{
  console.log("db starting...");

  /**
   * 连接
   */
  mongoose.connect(DB_URL, { useNewUrlParser: true });

  /**
    * 连接成功
    */
  mongoose.connection.on('connected', function () {    
      console.log('Mongoose connection open to ' + DB_URL);  
      if(callback)
      {
        callback();
      }
  });    

  /**
   * 连接异常
   */
  mongoose.connection.on('error',function (err) {    
      console.log('Mongoose connection error: ' + err);  
  });    
  
  /**
   * 连接断开
   */
  mongoose.connection.on('disconnected', function () {    
      console.log('Mongoose connection disconnected');  
  });    
  /*
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        console.log("db connected");
        const dbo = db.db("linebot");
        
        const myobj = { name: "john", time: "2018/10/13/00:58", content: "hello, good evening" };
        dbo.collection("comments").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });

        if(callback)
        {
          callback(dbo);
        }
    });
    */
}

exports.start = start;