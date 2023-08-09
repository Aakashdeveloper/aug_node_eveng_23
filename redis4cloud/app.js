import express from 'express';
import axios from 'axios';
import { createClient } from 'redis';
const port = 7011;
const app = express();

const client =createClient({
    password:'',
    socket: {
        host: 'redis-17062.c10.us-east-1-4.ec2.cloud.redislabs.com',
        port: 17062
    }
})

client.on('error',err=> console.log(err))

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

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})