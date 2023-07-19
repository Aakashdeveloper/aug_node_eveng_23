let express = require('express')
let categoryRouter = express.Router();

categoryRouter.route('/')
    .get(function(req,res){
        res.send('This is category Route')
    })

categoryRouter.route('/details')
    .get(function(req,res){
        res.send('This is category Details Route')
    })

module.exports = categoryRouter