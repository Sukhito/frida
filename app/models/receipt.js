var mongoose = require('mongoose');

module.exports = mongoose.model('Receipt',{
    date:{type:Date},
    receiptItems :[{
    	item : { type: mongoose.Schema.Types.ObjectId, ref : 'Item'},
    	qty : {type:Number},
    	oldBalance : {type:Number},
    	newBalance : {type:Number}
    }]
});