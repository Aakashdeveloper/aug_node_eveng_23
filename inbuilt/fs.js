let fs = require('fs');

// fs.writeFile('myFile.txt','My code for Fs',function(){
//     console.log('File Created')
// })

// fs.appendFile('myText.txt','This is line number 1 \n',()=>{
//     console.log('File Appended')
// })


// fs.readFile('db.json','utf-8',(err,data) => {
//     if(err) throw err;
//     console.log(data)
// })


// fs.rename('myText.txt','mydata.txt',function(err){
//     if(err) throw err;
//     console.log('File Renamed')
// })

// fs.unlink('myFile.txt',(err)=>{
//     if(err) throw err;
//     console.log('File Deleted')
// })

let data = fs.readFileSync('myText.txt','utf-8')
console.log(data)

let data1 = fs.readFileSync('myText1.txt','utf-8')
console.log(data1)