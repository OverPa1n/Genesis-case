const axios = require('axios');
const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports = async function(req, res, next) {
    const result = await axios.get('http://localhost:8890/rate');
    const rate = result.data;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vasilishin08@gmail.com',
            pass: 'gwjqtvwqiptdkhlx'
        }
    });
    const emails = fs.readFileSync('emails.txt', 'utf-8').split(', ');
    const messages = emails.map(email => {
        return {
            from: '"Nazar" <vasilishin08@gmail.com>',
            to: email,
            subject: 'BTC rate',
            text: `current BTC to UAH exchange rate ${rate} UAH`
        }
    })
    
    for (const message of messages) {
        await transporter.sendMail(message);
    }

    return res.send('Emails have been sent');
}
