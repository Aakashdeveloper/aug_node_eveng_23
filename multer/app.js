const express = require('express');
const multer = require('multer');
const app = express();
const port = 9112

//static file
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');


const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'uploads')
    },
    filename:(req,file,cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
})


const upload = multer({storage:storage})


app.get('/',(req,res) => {
    res.render('index')
})


app.post('/upload', upload.single('file'),(req,res) => {
    res.json({message:'file uploaded'})
})


app.listen(port,(err) => {
    console.log(`Running on port ${port}`)
})