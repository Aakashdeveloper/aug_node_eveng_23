let express = require('express');
let productRouter = express.Router();
let {getData} = require('./dbcontroller');

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

    productRouter.route('/details')
        .get(function(req,res){
        res.send('Products Details')
    })

    return productRouter

}

module.exports = router