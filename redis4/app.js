let express = require('express');
let axios = require('axios');
let port = process.env.PORT || 7720;
let app = express();
import { createClient } from 'redis';

let client = createClient({
    host:'localhost',
    port:6379
})

client.on('error',err=> console.log(`Redis Client Error`,err))

app.get('/data',async(req,res) => {
    await client.connect();
    let userInput = req.query.country.trim();
    userInput = userInput?userInput:'India';
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    let result = await client.get(userInput)
    if(result){
        let ouput = JSON.parse(result);
        res.send(ouput)
    }else{
        let apiResponse = await axios.get(url);
        let output = apiResponse.data;
        await client.set(userInput,JSON.stringify({source:'Redis Cache',output}),{EX:10,NX:true})
        res.send({source:'Api Response',output})
    }

    await client.disconnect();
})


app.listen(port,(err) => {
    if(err) console.log(err)
    console.log(`Server is running on port ${port}`)
})