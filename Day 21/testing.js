const nodemailer = require("nodemailer");

const receiver = "agrawalnirbhay1030@gmail.com"
const sender = "phoenixreborn1030@gmail.com"
const password = "sfyxdfkhzcxadncc"



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: sender,
    pass: password,
  },
});

// const info = await transporter.sendMail({
//     from: sender, // sender address
//     to: receiver, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

const mailData = {
    from: 'phoenixreborn1030@gmail.com',  // sender address
        to: 'agrawalnirbhay1030@gmail.com',   // list of receivers
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>',
    };

transporter.sendMail(mailData, function (err, info) {
    if(err)
        console.log(err)
    else
        console.log(info);
    });