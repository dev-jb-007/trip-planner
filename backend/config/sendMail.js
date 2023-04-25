// sfgyobhhysedcaxl
// let info = await transporter.sendMail({
//     from: 'devpatel8907@gmail.com',
//     to: email,
//     subject: "Your Progress",
//     text: message  
// });
const emailTemplate=require('../utils/emailTemplate');
require('dotenv').config();
const nodemailer = require("nodemailer");
async function main(obj) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "devpatel8907@gmail.com", // generated ethereal user
      pass: "sfgyobhhysedcaxl", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(obj);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
exports.sendEmailVerificationMail=(email,name,url)=>{
    let obj={
        from: 'devpatel8907@gmail.com',
        to: email,
        subject: "Verify Your Email",
        html: emailTemplate.verficationMail(url,name) 
    }
    main(obj);
}