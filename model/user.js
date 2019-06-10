const mongoose = require('mongoose');



var UserSchema = new mongoose.Schema({
    userid: {type: String, unique: true, required: [true, "can't be blank"], index: true},
    state: Number,
    money: Number,
    lastlogin: Date,
    memo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Memo' }]
  }, {timestamps: true});


mongoose.model('User', UserSchema, 'user_info');
