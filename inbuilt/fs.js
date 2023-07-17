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

// fs.rename('mydata.txt','mycode.txt',(err)=>{
//     if(err) throw err;
//     console.log('file renamed')
// })

// fs.unlink('mycode.txt',(err)=>{
//     if(err) throw err;
//     console.log('file deleted')
// })

let data = fs.readFileSync('db.json',{encoding:'utf-8',flag:'r'})
console.log("11>>>",data)

let data1 = fs.readFileSync('db1.json',{encoding:'utf-8',flag:'r'})
console.log("222>>>",data1)
