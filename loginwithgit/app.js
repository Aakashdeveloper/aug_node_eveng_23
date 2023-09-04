let express = require('express');
let app = express();
let superagent = require('superagent');
let cors = require('cors');
let request = require('request');
let port = process.env.PORT || 7710;
app.use(cors());

app.get('/',(req,res) => {
    res.send('<a href="https://github.com/login/oauth/authorize?client_id=851f086c321e844b4ea8">Login With Git</a>')
})

app.get('/profile',(req,res) => {
    const code = req.query.code;
    if(!code){
        res.send({
            success:false,
            message: 'Code is required'
        })
    }

    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'851f086c321e844b4ea8',
            client_secret:'',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            let access_token = result.body.access_token;
            const option ={ 
                uri:'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':`Bearer ${access_token}`,
                    'User-Agent':'mycode'
                }
            }
            request(option,(err,response,body) => {
                res.send(body)
            })

        })

})

app.listen(port,() => {
    console.log(`Listing to port ${port}`)
})