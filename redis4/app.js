let express = require('express');
let axios = require('axios');
let port = process.env.PORT || 7720;
let app = express();
import { createClient } from 'redis';

let client = createClient({
    host:'localhost',
    port:6379
})

app.get('/data',(req,res) => {})



app.listen(port,(err) => {
    if(err) console.log(err)
    console.log(`Server is running on port ${port}`)
})