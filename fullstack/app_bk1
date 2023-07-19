let express = require('express');
let app = express();
let port = 9101;


//default route
app.get('/',function(req,res){
    res.send("Hii From express");
});

app.get('/category',function(req,res){
    res.send('This is category route');
});

app.get('/details',function(req,res){
    res.send('Category Details')
})


app.get('/products',function(req,res){
    res.send('This is products route');
});

app.get('/details',function(req,res){
    res.send('Products Details')
})

//create server
app.listen(port,function(err){
    if(err) throw err;
    console.log("server listening to port "+port);
});