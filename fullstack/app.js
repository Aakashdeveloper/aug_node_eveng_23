let express = require('express');
let app = express();
let categoryRouter = require('./src/controller/categoryRouter');
let productRouter = require('./src/controller/productRouter');
let port = 9101;


//default route
app.get('/',function(req,res){
    res.send("Hii From express");
});

app.use('/category', categoryRouter)
app.use('/products', productRouter)


//create server
app.listen(port,function(err){
    if(err) throw err;
    console.log("server listening to port "+port);
});