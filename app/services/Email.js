const mailer = require('nodemailer');
let transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "testnodmailer@gmail.com",
      pass: "test@1234",
    },
  });

class Email {
    constructor() { }
    sendEmailVerificationMail(email) {
      let code = Math.floor(100000 + Math.random() * 900000);
  
      let mailOptions = {
        from: "testnodmailer@gmail.com",
        to: email,
        subject: "Verification code for Food App",
        text: `Your verification code for Food App is ${code}`,
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success!!");
        }
      });
  
      return code;
    }
}
module.exports = Email