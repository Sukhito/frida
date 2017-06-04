var mongoose = require('mongoose');

module.exports = mongoose.model('Sale',{
    date:{type:Date},
    saleItems :[{
    	item : { type: mongoose.Schema.Types.ObjectId, ref : 'Item'},
    	qty : {type:Number}
    }]
});