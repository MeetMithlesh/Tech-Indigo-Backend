const express = require('express');
const router = require('express').Router();
const path = require('path');
const User = require('../models/schema.js');
const session = require('express-session');
const { type } = require('os');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "techindigoevent@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(user) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Team Tech Indigo" <techindigoevent@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Welcome to Tech Indigo | Registered successfully", // Subject line
    html:  `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color:rgb(11, 48, 108);
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .body {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
        }
        .body h2 {
            color: #4caf50;
        }
        .footer {
            background-color: #f1f1f1;
            color: #777777;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
        .footer a {
            color: #4caf50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Tech Indigo</h1>
            <p>Welcome to the Future of IoT</p>
        </div>
        <div class="body">
            <h2>Registration Successful!</h2>
            <p>Dear ${user.name}, </p>
            <p>Congratulations! You have successfully registered for <strong>Tech Indigo</strong>, our premier event focused on the latest innovations in IoT.</p>
            <p><strong>Event Details:</strong></p>
            <ul>
                <li><strong>Date:</strong> 2 February </li>
                <li><strong>Time:</strong> 11 AM onwards</li>
                <li><strong>Venue:</strong> .......</li>
            </ul>
            <p>Prepare to be inspired by industry leaders, innovative projects, and hands-on workshops designed to expand your knowledge and skills in the IoT domain.</p>
            <p>If you have any questions, feel free to contact us at <a href="mailto:techindigoevent@gmail.com">techindigoevent@gmail.com</a>.</p>
            <p>We look forward to seeing you there!</p>
            <p>Best regards,</p>
            <p><strong>Tech Indigo Team</strong></p>
        </div>
        <div class="footer">
            <p>Stay connected with us:</p>
            <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">LinkedIn</a>
            <p>&copy; 2025 Tech Indigo. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`,
  });

//   console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

router.use(session({   
    secret: 'secret',
    resave: true,
    saveUninitialized: true
})  
);
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../../tech-indigo/register.html"));
});
router.post('/register', (req, res) => {
    req.session.formData = req.body;
    const userData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        year: req.body.year,
        course: req.body.course,
        college: req.body.college,
        address: req.body.address,
        couponCode: req.body.couponCode || req.query.discount,
    }

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user){
            User.create(userData).then(user => {
                res.status(200).json({message: user.name + ' registered successfully\nWelcome to Tech Indigo',id: user._id, name: user.name, email: user.email})
                main(user).catch(console.error);
                
            })
            .catch(err => {
                res.send('error1: ' + err)
            })
        } else {
            res.status(409).json({error: ' User already exists'})
        }
    })
    .catch(err => {
        res.send('error2: ' + err)
    })
})

module.exports = router;