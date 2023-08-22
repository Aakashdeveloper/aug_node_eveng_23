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


async function postData(colName,data){
    let output;
    try{
        output = await db.collection(colName).insert(data)
    }catch(err){
        output = {"error":`Error while inserting in ${colName}`}
    }
    return output
}

async function updateData(colName,condition,data){
    let output;
    try{
        output = await db.collection(colName).update(condition,data)
    }catch(err){
        output = {"error":`Error while inserting in ${colName}`}
    }
    return output
}

async function deleteData(colName,data){
    let output;
    try{
        output = await db.collection(colName).update(condition)
    }catch(err){
        output = {"error":`Error while inserting in ${colName}`}
    }
    return output
}

module.exports = {
    dbConnect,
    getData,
    getDataSort,
    getDataSortLimit,
    postData,
    updateData,
    deleteData
}