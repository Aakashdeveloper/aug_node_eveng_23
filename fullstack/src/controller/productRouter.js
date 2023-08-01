let express = require('express');
let productRouter = express.Router();
let {getData} = require('./dbcontroller');
let mongo = require('mongodb')

function router(menu){
    
    productRouter.route('/')
        .get(async function(req,res){
            let query = {};
            let products = await getData('products',query)
            res.render('products',{title:'Products Page',products,menu})
    })

    // on basis of category
    productRouter.route('/list/:id')
    .get(async function(req, res){
        let id = req.params.id
        let query = {"category_id":Number(id)}
        let products = await getData('products',query)
        res.render('products',{title:'Products Page',products,menu})
    })

    productRouter.route('/details/:id')
        .get(async function(req,res){
            //let id = req.params.id;
            let {id} = req.params;
            let query = {_id:mongo.ObjectId(id)}
            let products = await getData('products',query)
            res.render('products',{title:'Products Page',products,menu})
    })

    return productRouter

}

module.exports = router