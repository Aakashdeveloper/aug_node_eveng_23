let express = require('express');
let app = express();
let categoryRouter = require('./src/controller/categoryRouter');
let productRouter = require('./src/controller/productRouter');
let port = 9101;

// static file path
app.use(express.static(__dirname+'/public'))
// html file path
app.set('views','./src/views')
// view engine
app.set('view engine','ejs')

//default route 
app.get('/',function(req,res){
    //res.send("Hii From express");
    res.render('index')
});

app.use('/category', categoryRouter)
app.use('/products', productRouter)


//create server
app.listen(port,function(err){
    if(err) throw err;
    console.log("server listening to port "+port);
});