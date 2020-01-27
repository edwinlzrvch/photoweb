const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { AdminController } = require('./admin.controller');
const app = express();

const db = mongoose.connection;
dotenv.config();
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('mongodb opened!');
});

app.use(express.static(`${process.cwd()}/build/`));

app.use('/api/admin', AdminController);

app.post('/form/', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h3> Contact Details </h3>
            <ul>
                <li> Name ${req.body.name}</li>
                <li> Email ${req.body.email}</li>
            </ul>
            <h3> Message </h3>
            <p>${req.body.message} </p>
        `

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                // add your EMAIL and PASSWORD in .env file 
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: "test@testaccaount.com",
            to: "donnie.bruen@ethereal.email",
            replyTo: "test@testaccaount.com",
            subject: "New Message",
            text: req.body.message,
            html: htmlEmail

        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }

            console.log('Message sent: %s', info.message);
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
});

//Serve static assets if in production

// Set static folder

app.get('*', (req, res) => {
    res.sendFile(`${process.cwd()}/build/index.html`);
});


const port = process.env.PORT || 5000;

app.use((req, res) => {
    res.status(404).send('Unknown page');
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})