const express = require('express');
const app = express();
const {MongoClient,ObjectId} = require('mongodb');
const url ="mongodb://127.0.0.1/27017";
const client = new MongoClient(url);

async function main(){
    await client.connect()
}

const collection = client.db('augnode').collection('dashboard');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 7710;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors())

app.get('/health',(req,res) => {
    res.send('Health Ok')
})

//add user
app.post('/addUser',async(req,res)=> {
    await collection.insertOne(req.body);
    res.send('User Added')
})

//get User
app.get('/users',async(req,res) => {
    let output = [];
    let query = {};
    if(req.query.role && req.query.city){
        query = {
            role:req.query.role,
            city:req.query.city,
            isActive:true
        }
    }else if(req.query.role){
        query = {
            role:req.query.role,
            isActive:true
        }
    }else if(req.query.city){
        query = {
            city:req.query.city,
            isActive:true
        }
    }else if(req.query.isActive){
        let isActive = req.query.isActive
        if(isActive == "false"){
            isActive = false
        }else{
            isActive = true
        }
        query = {isActive}
    }
    else{
        query = {
            isActive:true
        }
    }

    const cursor = collection.find(query);
    for await (const data of cursor){
        output.push(data)
    }

    cursor.closed;
    res.send(output)
})


//get particular User
app.get('/user/:id',async(req,res) => {
    const output = [];
    let query = {_id:new ObjectId(req.params.id)}
    const result = await collection.findOne(query);
    
    res.send(result)
})




app.listen(port,() => {
    main();
    console.log(`Server is running on port ${port}`)
})