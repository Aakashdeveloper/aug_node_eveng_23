let express = require('express');
let app = express();
let mongo = require('mongodb');
let dotenv = require('dotenv');
dotenv.config();
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT;
let {dbConnect,getData,getDataSort,getDataSortLimit,
    postData,updateData,deleteData} = require('./controller/dbController');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


//heart beat
app.get('/',(req,res) => {
    res.send('Health Ok')
})

//list of city
app.get('/location',async(req,res) => {
    let query = {};
    let collection = 'location';
    let output = await getData(collection,query);
    res.send(output);
})

// list of restaurants
app.get('/restaurants', async(req,res) => {
    let query = {};
    let mealId = Number(req.query.mealId)
    let stateId = Number(req.query.stateId)
    let collection = 'restaurants';
    if(mealId && stateId){
        query = {
            "state_id":stateId,
            "mealTypes.mealtype_id":mealId
        }
    }
    else if(mealId){
        query = {
            "mealTypes.mealtype_id":mealId
        }
    }else if(stateId){
        query = {
            "state_id":stateId
        }
    }
    let output = await getData(collection,query,sort);
    res.send(output);
})

// list of mealType
app.get('/mealType', async(req,res) => {
    let query = {};
    let collection = 'mealType';
    let output = await getData(collection,query);
    res.send(output);
})

//filters
app.get('/filters/:mealId',async (req,res) => {
    let query = {};
    let collection = 'restaurants';
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let sort = {cost:1};
    let skip = 0;
    let limit = 1000000000000
    if(req.query.sort){
        sort={cost:req.query.sort}
    }

    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip)
        limit = Number(req.query.limit)
    }

    if(cuisineId){
        query = {
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }
    }else if(lcost && hcost){
        query = {
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }else{
        query = {
            "mealTypes.mealtype_id":mealId,
        }
    }
    let output = await getDataSortLimit(collection,query,sort,skip,limit);
    res.send(output);

})


// Restaurants Details
app.get('/details/:id',async(req,res) => {
    // let id = Number(req.params.id)
    // let query = {restaurant_id:id};
    const validObjId = (id) => {
        const idPattern = /^[0-9a-fA-F]{24}$/
        return idPattern.test(id)
    } 
    if(validObjId(req.params.id)){
        let _id = mongo.ObjectId(req.params.id)
        let query = {_id};
        let output = await getData("restaurants",query)
        res.send(output);
    }else{
        res.send('Invalid object id')
    }
    
})

// menu wrt Restaurants
app.get('/menu/:id',async(req,res) => {
    let id = Number(req.params.id)
    let query = {restaurant_id:id};
    let output = await getData("menu",query)
    res.send(output);
})

// orders
app.get('/orders',async(req,res) => {
    let query = {};
    if(req.query.email){
        query = {email:req.query.email}
    }
    let output = await getData("rorders",query)
    res.send(output);
})

//placeOrder 
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    console.log(req.body)
    let collection = 'rorders';
    let response = await postData(collection,data);
    res.send(response)
})

//menuDetails {"id":[1,2,3]}
app.post('/menuDetails',async(req,res) => {
    if(Array.isArray(req.body.id)){
        console.log(req.body.id)
        let query = {menu_id:{$in:req.body.id}};
        let collection = 'menu';
        let output = await getData(collection,query)
        res.send(output)
    }else{
        res.send(`Please pass data in format of  {"id":[1,2,3]}`)
    }
})


// update data
app.put('/updateOrder', async(req,res) => {
    let collection = 'rorders';
    let condition = {_id:mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateData(collection,condition,data);
    res.send(output);
})


// delete data
app.delete('/deleteOrder', async(req,res) => {
    let collection = 'rorders';
    let condition = {_id:mongo.ObjectId(req.body._id)}
    let rowCount = await getData(collection,condition)
    if(rowCount.length > 0){
        let response = await deleteData(collection,condition)
        res.send('Data Deleted')
    }else{
        res.send('No Data Found')
    }
   
})





app.listen(port,() => {
    dbConnect();
    console.log(`Running on port ${port}`)
})