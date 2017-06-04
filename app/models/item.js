var mongoose = require('mongoose');

module.exports = mongoose.model('Item',{
    name:{type:String},
    code :{type:String},
    balance : {type:Number,default:0},
    price:{type:Number}
});