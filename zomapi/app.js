let express = require('express');
let app = express();
let mongo = require('mongodb');
let dotenv = require('dotenv');
dotenv.config();
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT;
let {dbConnect} = require('./controller/dbController');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


//heart beat
app.get('/',(req,res) => {
    res.send('Health Ok')
})


app.listen(port,() => {
    dbConnect();
    console.log(`Running on port ${port}`)
})