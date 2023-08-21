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

async function getData(colName,query){
    let output;
    try{
        output = await db.collection(colName).find(query).toArray()
    } catch(err){
        output = {"error":`Error in condition for getting data from ${colName}`}
    }

    return output
}


async function getDataSort(colName,query,sort){
    let output;
    try{
        output = await db.collection(colName).find(query).sort(sort).toArray()
    }catch(err){
        output = {"error":`Error in condition for getting data from ${colName}`}
    }

    return output
}

async function getDataSortLimit(colName,query,sort,skip,limit){
    let output;
    try{
        output = await db.collection(colName).find(query).sort(sort).skip(skip).limit(limit).toArray()
    }catch(err){
        output = {"error":`Error in condition for getting data from ${colName}`}
    }

    return output
}

module.exports = {
    dbConnect,
    getData,
    getDataSort,
    getDataSortLimit
}