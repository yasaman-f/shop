var nodemailer = require('nodemailer');

function sendCode(email, code) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yasi.fani.85@gmail.com',
        pass: 'fzqvxdzsiuphkeur'
      }
    });
    
    var mailOptions = {
      from: 'yasi.fani.85@gmail.com',
      to: email,
      subject: 'Sending otp with email',
      text: code
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });   
}

// const { Resend } = require('resend')

// const resend = new Resend('re_XTzXLozA_8d1f8D1jQov4gmF3jBQ7woyq');

// function sendCode(email, code) {
//     resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: email,
//       subject: 'Sending otp with email',
//       html: `<p>Your one-time password: <strong>${code}</strong>!</p>`
//     });
// }

// sendCode('yasi.fani.85@gmail.com', '1245347')