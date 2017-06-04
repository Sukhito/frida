var async = require('async');


var Item = require('./models/item');
var Receipt = require('./models/receipt');
var Sale = require('./models/sale');

module.exports = function(app){
	app.get('/api/items',function(req,res){
		Item.find({},function(err,items){
			if(err) res.send(err);
			res.json(items);
		})
	})

	app.post('/api/items',function(req,res){
		Item.create(req.body,function(err,item){
			if(err) res.send(err);
			res.json(item);
		})
	})

    app.put('/api/items/:id',function(req,res){
        Item.findByIdAndUpdate({_id:req.params.id},req.body,function(err,item){
            if(err) res.send(err);
            res.json(item);
        })
    })

    app.get('/api/items/:id',function(req,res){
        Item.find({_id:req.params.id},function(err,item){
            if(err) res.send(err);
            res.json(item);
        })
    })

    app.put('/api/items/:id/balance',function(req,res){
        Item.update({_id:req.params.id},{$set:req.body},function(err,result){
            if(err) res.send(err);
        });
    })

    app.get('/api/receipts',function(req,res){
        Receipt
        .find({})
        .sort('-date')
        .populate('receiptItems.item')
        .exec(function(err,receipts){
            if(err) res.send(err);
            res.json(receipts)
        })
    })

    app.post('/api/receipts',function(req,res){

		Receipt.create(req.body,function(err,receipt){
			if(err) res.send(err);
	        Receipt
            .findOne({_id:receipt._id})
            .populate('receiptItems.item')
            .exec(function(err,receipt){
                if(err) res.send(err);
                res.json(receipt)
            })

		})
	})
    app.get('/api/sales',function(req,res){
        Sale
        .find({})
        .populate('saleItems.item')
        .exec(function(err,sales){
            if(err) res.send(err);
            res.json(sales)
        })
    })

    app.post('/api/sales',function(req,res){
        Sale.create(req.body,function(err,sale){
            if(err) res.send(err);
            Sale
            .findOne({_id:sale._id})
            .populate('saleItems.item')
            .exec(function(err,sale){
                if(err) res.send(err);
                res.json(sale)
            })

        })
    })


}