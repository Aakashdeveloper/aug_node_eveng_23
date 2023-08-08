const express = require('express');
const formidable = require('formidable');
const app = express();
const port = process.env.PORT || 9887;
const fs = require('fs');

//static file
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');


app.get('/',(req,res) => {
    res.render('index')
})

app.post('/upload', async(req,res) => {
  let form = new formidable.IncomingForm();
  form.parse(req,function(err,field,files){
      let oldPath = files.uimage.filepath;
      let newPath = `${__dirname}/public/images/${files.uimage.originalFilename}`
      fs.rename(oldPath, newPath,(err) => {
          if(err) throw err;
          res.render('display',{image:`${files.uimage.originalFilename}`})
      })
  })

})

app.listen(port,(err) => {
    console.log(`Running on port ${port}`)
})