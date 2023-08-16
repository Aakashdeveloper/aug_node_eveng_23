let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.MongoUrl;
let db;

function dbConnect(){
    MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,client) => {
        if(err) console.log(`Error while connecting to mongo`);
        db = client.db('internfeb')
    })
}


module.exports = {
    dbConnect
}