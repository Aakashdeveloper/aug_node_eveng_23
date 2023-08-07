const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 9887;

//static file
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload())

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/upload', async(req,res) => {
    console.log(req.files);
    console.log(req.body);
    const imageFile = req.files.uimage;
    await imageFile.mv(`${__dirname}/public/images/${imageFile.name}`);
    res.render('display',{title:req.body.iname,image:`${imageFile.name}`})
})

app.listen(port,(err) => {
    console.log(`Running on port ${port}`)
})