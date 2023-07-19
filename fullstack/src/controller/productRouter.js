let express = require('express');
let productRouter = express.Router();

productRouter.route('/')
    .get(function(req,res){
        res.send('This is products route')
    })

productRouter.route('/details')
    .get(function(req,res){
        res.send('Products Details')
    })

module.exports = productRouter