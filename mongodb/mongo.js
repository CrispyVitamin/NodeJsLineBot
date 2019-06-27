const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const DB_URL = process.env.DB_HOST;




function start(callback)
{
  console.log("db starting...");

  /**
   * 連接
   */
  mongoose.connect(DB_URL, { useNewUrlParser: true });

  /**
    * 連接成功
    */
  mongoose.connection.on('connected', function () {    
      console.log('Mongoose connection open to ' + DB_URL);  
      if(callback) {
        callback();
      }
  });    

  /**
   * 連接異常
   */
  mongoose.connection.on('error',function (err) {    
      console.log('Mongoose connection error: ' + err);  
  });    
  
  /**
   * 連接斷開
   */
  mongoose.connection.on('disconnected', function () {    
      console.log('Mongoose connection disconnected');  
  });
}

exports.start = start;