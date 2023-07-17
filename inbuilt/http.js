let http = require('http');

//req > what we send to server body,params, queryparams
//res > what server send us

let server = http.createServer((req,res) => {
    res.write('<h1>This is http NodeJs server</h1>');
    res.end();
})

server.listen(1765)
