let fs = require('fs');
let http = require('http');

let server = http.createServer(function(req,res){
    //read file
    fs.readFile('db.json','utf-8',function(err,data){
        if(err) throw err;
        //return data of json file
        res.write(data);
        res.end();
    })
})

server.listen(9873)