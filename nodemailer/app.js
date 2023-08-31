let nodemailer = require('nodemailer');
let dotenv = require('dotenv');
dotenv.config();

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'ahanda205@gmail.com',
        pass:process.env.PASS
    }
})

let mailOptions = {
    form:'ahanda205@gmail.com',
    to:'ahanda206@hotmail.com',
    subject:'Sending Email Aug Node',
    text:'This is text and test email'
}

transporter.sendMail(mailOptions,(err,info) => {
    if(err) console.log(err);
    else{
        console.log(`Email sent: ${info.response}`)
    }
})