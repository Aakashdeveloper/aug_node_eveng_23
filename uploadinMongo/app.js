const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const port = 9881
const app = express();

//static file
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://127.0.0.1:27017/augnode',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


const storage = multer.memoryStorage();
const upload = multer({storage:storage});

// Model
const Image = mongoose.model('Images',{data:Buffer,contentType:String})



app.get('/',(req,res) => {
    res.render('index')
})


if(conditon1){
    if(conditon2){

    }else{

    }

}else{

}

app.post('/upload', upload.single('image'),async(req,res) => {
    try{
        const image = new Image({
            data:req.file.buffer,
            contentType:req.file.mimetype
        })
        await image.save();
        res.send({message:'Image Uploaded'})
    }catch(err){
        res.send({error:'Error While Uploading'})
    }
})

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})